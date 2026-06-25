import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Non autenticato' },
        { status: 401 }
      );
    }

    const adminEmails = process.env.ADMIN_EMAILS?.split(',').map((item) => item.trim()) || [];
    const barberEmails = process.env.BARBER_EMAILS?.split(',').map((item) => item.trim()) || [];

    const isAdmin = adminEmails.includes(email);
    const isBarber = barberEmails.includes(email);

    return NextResponse.json({
      success: true,
      email,
      permissions: {
        isAdmin,
        isBarber,
        hasManagementAccess: isAdmin || isBarber,
      },
    });
  } catch (error) {
    console.error('Staff permissions check error:', error);
    return NextResponse.json(
      { success: false, error: 'Errore del server' },
      { status: 500 }
    );
  }
}
