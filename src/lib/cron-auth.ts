import { timingSafeEqual } from 'node:crypto';

export function isAuthorizedCronRequest(
  authorizationHeader: string | null,
  cronSecret: string | undefined,
): boolean {
  if (!cronSecret || !authorizationHeader?.startsWith('Bearer ')) return false;

  const suppliedSecret = authorizationHeader.slice('Bearer '.length);
  const expected = Buffer.from(cronSecret);
  const supplied = Buffer.from(suppliedSecret);

  return expected.length === supplied.length && timingSafeEqual(expected, supplied);
}
