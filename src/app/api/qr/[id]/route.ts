import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { generateQrDataUrl, formatContentForQr } from '@/lib/qr-generator';
import { qrCodeUpdateSchema } from '@/lib/validators';
import { handleApiError, UnauthorizedError, NotFoundError, ForbiddenError } from '@/lib/errors';
import { QrContentType, ErrorCorrectionLevel } from '@/types';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const authUser = await getCurrentUser();
    if (!authUser) {
      throw new UnauthorizedError();
    }

    const { id } = await params;

    const qrCode = await prisma.qrCode.findUnique({
      where: { id },
      include: {
        tags: {
          include: { tag: true },
        },
        folder: {
          select: { id: true, name: true },
        },
      },
    });

    if (!qrCode) {
      throw new NotFoundError('QR-код');
    }

    if (qrCode.userId !== authUser.userId) {
      throw new ForbiddenError();
    }

    return NextResponse.json({
      success: true,
      data: {
        ...qrCode,
        createdAt: qrCode.createdAt.toISOString(),
        updatedAt: qrCode.updatedAt.toISOString(),
        tags: qrCode.tags.map((t) => ({
          id: t.tag.id,
          name: t.tag.name,
          color: t.tag.color,
          createdAt: t.tag.createdAt.toISOString(),
        })),
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const authUser = await getCurrentUser();
    if (!authUser) {
      throw new UnauthorizedError();
    }

    const { id } = await params;
    const body = await request.json();
    const data = qrCodeUpdateSchema.parse(body);

    const existingQr = await prisma.qrCode.findUnique({
      where: { id },
    });

    if (!existingQr) {
      throw new NotFoundError('QR-код');
    }

    if (existingQr.userId !== authUser.userId) {
      throw new ForbiddenError();
    }

    const needsRegeneration =
      data.foregroundColor !== undefined ||
      data.backgroundColor !== undefined ||
      data.size !== undefined ||
      data.errorCorrectionLevel !== undefined;

    let qrDataUrl = existingQr.qrDataUrl;

    if (needsRegeneration) {
      const formattedContent = formatContentForQr(
        existingQr.contentType as QrContentType,
        existingQr.content
      );

      qrDataUrl = await generateQrDataUrl({
        content: formattedContent,
        foregroundColor: data.foregroundColor || existingQr.foregroundColor,
        backgroundColor: data.backgroundColor || existingQr.backgroundColor,
        size: data.size || existingQr.size,
        errorCorrectionLevel: (data.errorCorrectionLevel || existingQr.errorCorrectionLevel) as ErrorCorrectionLevel,
      });
    }

    if (data.tagIds !== undefined) {
      await prisma.qrCodeTag.deleteMany({
        where: { qrCodeId: id },
      });
    }

    const qrCode = await prisma.qrCode.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        isFavorite: data.isFavorite,
        folderId: data.folderId,
        foregroundColor: data.foregroundColor,
        backgroundColor: data.backgroundColor,
        size: data.size,
        errorCorrectionLevel: data.errorCorrectionLevel,
        qrDataUrl,
        tags: data.tagIds && data.tagIds.length > 0
          ? {
              create: data.tagIds.map((tagId) => ({
                tagId,
              })),
            }
          : undefined,
      },
      include: {
        tags: {
          include: { tag: true },
        },
        folder: {
          select: { id: true, name: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        ...qrCode,
        createdAt: qrCode.createdAt.toISOString(),
        updatedAt: qrCode.updatedAt.toISOString(),
        tags: qrCode.tags.map((t) => ({
          id: t.tag.id,
          name: t.tag.name,
          color: t.tag.color,
          createdAt: t.tag.createdAt.toISOString(),
        })),
      },
      message: 'QR-код успішно оновлено',
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const authUser = await getCurrentUser();
    if (!authUser) {
      throw new UnauthorizedError();
    }

    const { id } = await params;

    const qrCode = await prisma.qrCode.findUnique({
      where: { id },
    });

    if (!qrCode) {
      throw new NotFoundError('QR-код');
    }

    if (qrCode.userId !== authUser.userId) {
      throw new ForbiddenError();
    }

    await prisma.qrCode.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'QR-код успішно видалено',
    });
  } catch (error) {
    return handleApiError(error);
  }
}
