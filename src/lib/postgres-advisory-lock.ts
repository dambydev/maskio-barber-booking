export interface AdvisoryLockClient {
  query(query: string, values?: any[]): Promise<{ rows: Array<Record<string, any>> }>;
}

export async function withPostgresAdvisoryLock<T>(
  client: AdvisoryLockClient,
  key: string,
  work: () => Promise<T>,
): Promise<{ acquired: true; value: T } | { acquired: false }> {
  const lockResult = await client.query(
    'SELECT pg_try_advisory_lock(hashtext($1)) AS locked',
    [key],
  );

  if (lockResult.rows[0]?.locked !== true) return { acquired: false };

  try {
    return { acquired: true, value: await work() };
  } finally {
    await client.query('SELECT pg_advisory_unlock(hashtext($1))', [key]);
  }
}
