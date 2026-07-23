export interface AdvisoryLockClient {
  query(query: string, values?: any[]): Promise<{ rows: Array<Record<string, any>> }>;
}

/**
 * Runs work while holding a transaction-scoped advisory lock.
 *
 * BEGIN pins a PgBouncer/Neon pooled connection to one PostgreSQL backend for
 * the complete transaction. pg_try_advisory_xact_lock is released by COMMIT,
 * ROLLBACK, or connection termination, including an interrupted serverless run.
 */
export async function withPostgresAdvisoryTransactionLock<T>(
  client: AdvisoryLockClient,
  key: string,
  work: () => Promise<T>,
): Promise<{ acquired: true; value: T } | { acquired: false }> {
  await client.query('BEGIN');

  try {
    const lockResult = await client.query(
      'SELECT pg_try_advisory_xact_lock(hashtext($1)) AS locked',
      [key],
    );

    if (lockResult.rows[0]?.locked !== true) {
      await client.query('ROLLBACK');
      return { acquired: false };
    }

    const value = await work();
    await client.query('COMMIT');
    return { acquired: true, value };
  } catch (error) {
    try {
      await client.query('ROLLBACK');
    } catch {
      // Releasing/closing the client in the route still terminates the transaction.
    }
    throw error;
  }
}
