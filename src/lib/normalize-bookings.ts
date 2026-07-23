export function normalizeBookingsPayload(payload: any): any[] {
  const rows = Array.isArray(payload) ? payload : payload?.bookings;
  if (!Array.isArray(rows)) throw new Error('Formato prenotazioni non valido');

  return rows.map((row: any) => ({
    id: row.id,
    barberId: row.barberId ?? row.barber_id ?? row.barber_name ?? '',
    date: row.date ?? row.booking_date ?? '',
    time: row.time ?? row.booking_time ?? '',
    duration: row.duration ?? 0,
    totalDuration: row.totalDuration ?? row.duration ?? 0,
    totalPrice: row.totalPrice ?? row.price ?? 0,
    customerInfo: row.customerInfo ?? {
      name: row.customer_name ?? '',
      email: row.customer_email ?? '',
      phone: row.customer_phone ?? '',
      notes: row.notes,
    },
    services: Array.isArray(row.services) ? row.services : [{
      id: row.service_id ?? row.service_name ?? 'service',
      name: row.service_name ?? row.service ?? 'Servizio',
      description: '',
      duration: row.duration ?? 0,
      price: Number(row.price ?? 0),
    }],
    createdAt: row.createdAt ?? row.created_at,
  }));
}
