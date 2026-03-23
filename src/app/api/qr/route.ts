import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { generateQrDataUrl, formatContentForQr } from '@/lib/qr-generator';
import { qrCodeCreateSchema } from '@/lib/validators';
import { handleApiError, UnauthorizedError } from '@/lib/errors';
import { QrContentType, QrFilterParams } from '@/types';
import { PAGINATION_DEFAULTS } from '@/lib/constants';
import { Prisma } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const authUser = await getCurrentUser();
    if (!authUser) {
      throw new UnauthorizedError();
    }

    const { searchParams } = new URL(request.url);
    const filters: QrFilterParams = {
      search: searchParams.get('search') || undefined,
      contentType: (searchParams.get('contentType') as QrContentType) || undefined,
      isFavorite: searchParams.get('isFavorite') === 'true' ? true : undefined,
      folderId: searchParams.get('folderId') || undefined,
      tagId: searchParams.get('tagId') || undefined,
      sortBy: (searchParams.get('sortBy') as QrFilterParams['sortBy']) || 'createdAt',
      sortOrder: (searchParams.get('sortOrder') as QrFilterParams['sortOrder']) || 'desc',
      page: parseInt(searchParams.get('page') || String(PAGINATION_DEFAULTS.page)),
      limit: Math.min(
        parseInt(searchParams.get('limit') || String(PAGINATION_DEFAULTS.limit)),
        PAGINATION_DEFAULTS.maxLimit
      ),
    };

    const where: Prisma.QrCodeWhereInput = {
      userId: authUser.userId,
    };

    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { content: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    if (filters.contentType) {
      where.contentType = filters.contentType;
    }

    if (filters.isFavorite !== undefined) {
      where.isFavorite = filters.isFavorite;
    }

    if (filters.folderId) {
      where.folderId = filters.folderId;
    }

    if (filters.tagId) {
      where.tags = {
        some: { tagId: filters.tagId },
      };
    }

    const total = await prisma.qrCode.count({ where });
    const page = filters.page || PAGINATION_DEFAULTS.page;
    const limit = filters.limit || PAGINATION_DEFAULTS.limit;
    const totalPages = Math.ceil(total / limit);

    const qrCodes = await prisma.qrCode.findMany({
      where,
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
        folder: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        [filters.sortBy || 'createdAt']: filters.sortOrder || 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const formattedCodes = qrCodes.map((qr) => ({
      ...qr,
      createdAt: qr.createdAt.toISOString(),
      updatedAt: qr.updatedAt.toISOString(),
      tags: qr.tags.map((t) => ({
        id: t.tag.id,
        name: t.tag.name,
        color: t.tag.color,
        createdAt: t.tag.createdAt.toISOString(),
      })),
    }));

    return NextResponse.json({
      success: true,
      data: formattedCodes,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const authUser = await getCurrentUser();
    if (!authUser) {
      throw new UnauthorizedError();
    }

    const body = await request.json();
    const data = qrCodeCreateSchema.parse(body);

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

    const qrCode = await prisma.qrCode.create({
      data: {
        userId: authUser.userId,
        content: data.content,
        contentType: data.contentType,
        title: data.title,
        description: data.description || null,
        qrDataUrl,
        foregroundColor: data.foregroundColor,
        backgroundColor: data.backgroundColor,
        size: data.size,
        errorCorrectionLevel: data.errorCorrectionLevel,
        folderId: data.folderId || null,
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
          include: {
            tag: true,
          },
        },
        folder: {
          select: {
            id: true,
            name: true,
          },
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
      message: 'QR-код успішно створено',
    }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
