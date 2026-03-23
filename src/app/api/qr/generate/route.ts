import { NextRequest, NextResponse } from 'next/server';
import { generateQrDataUrl, formatContentForQr } from '@/lib/qr-generator';
import { qrGenerateSchema } from '@/lib/validators';
import { handleApiError } from '@/lib/errors';
import { QrContentType } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = qrGenerateSchema.parse(body);

    const formattedContent = formatContentForQr(
      data.contentType as QrContentType,
      data.content
    );

    const qrDataUrl = await generateQrDataUrl({
      content: formattedContent,
      foregroundColor: data.foregroundColor,
      backgroundColor: data.backgroundColor,
      size: data.size,
      errorCorrectionLevel: data.errorCorrectionLevel,
    });

    return NextResponse.json({
      success: true,
      data: { qrDataUrl },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
