'use client';

export const BOOKING_CHANGED_EVENT = 'maskio:booking-changed';

export type BookingChangeOperation = 'create' | 'update' | 'delete' | 'swap';

export function emitBookingChanged(operation: BookingChangeOperation): void {
  window.dispatchEvent(new CustomEvent(BOOKING_CHANGED_EVENT, { detail: { operation } }));
}
