export const MANUAL_EXCEPTION_MARKER = '__manual_exception__';

const TIME_SLOT_REGEX = /^\d{2}:\d{2}$/;

type ScheduleLike = {
  unavailableSlots?: string | null;
  unavailable_slots?: string | null;
  createdAt?: Date | string | null;
  created_at?: Date | string | null;
  updatedAt?: Date | string | null;
  updated_at?: Date | string | null;
};

function parseJsonArray(value?: string | null): unknown[] {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function toDate(value?: Date | string | null): Date | null {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function parseTimeSlots(value?: string | null): string[] {
  return parseJsonArray(value).filter(
    (slot): slot is string => typeof slot === 'string' && TIME_SLOT_REGEX.test(slot)
  );
}

export function getScheduleTimeSlots(availableSlots?: string | null, unavailableSlots?: string | null): string[] {
  return [...new Set([...parseTimeSlots(availableSlots), ...parseTimeSlots(unavailableSlots)])];
}

export function withManualExceptionMarker(unavailableSlots?: string | null): string {
  const parsed = parseJsonArray(unavailableSlots).filter((slot): slot is string => typeof slot === 'string');

  if (!parsed.includes(MANUAL_EXCEPTION_MARKER)) {
    parsed.push(MANUAL_EXCEPTION_MARKER);
  }

  return JSON.stringify(parsed);
}

export function hasManualExceptionMarker(unavailableSlots?: string | null): boolean {
  return parseJsonArray(unavailableSlots).includes(MANUAL_EXCEPTION_MARKER);
}

export function isManualExceptionalSchedule(schedule?: ScheduleLike | null): boolean {
  if (!schedule) return false;

  const unavailableSlots = schedule.unavailableSlots ?? schedule.unavailable_slots ?? null;

  if (hasManualExceptionMarker(unavailableSlots)) {
    return true;
  }

  // Compatibilità con aperture eccezionali salvate prima del marker esplicito:
  // l'endpoint manuale aggiorna updated_at, mentre il daily update storico non lo faceva.
  const createdAt = toDate(schedule.createdAt ?? schedule.created_at ?? null);
  const updatedAt = toDate(schedule.updatedAt ?? schedule.updated_at ?? null);

  if (!createdAt || !updatedAt) return false;

  return updatedAt.getTime() - createdAt.getTime() > 1000;
}
