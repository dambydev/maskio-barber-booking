import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
  const destination = new URL(request.url);
  destination.pathname = '/chi-siamo';

  return NextResponse.redirect(destination, 308);
}
