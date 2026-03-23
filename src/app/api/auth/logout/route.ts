import { NextResponse } from 'next/server';
import { removeAuthCookie } from '@/lib/auth';
import { handleApiError } from '@/lib/errors';

export async function POST() {
  try {
    await removeAuthCookie();

    return NextResponse.json({
      success: true,
      message: 'Вихід успішний',
    });
  } catch (error) {
    return handleApiError(error);
  }
}
