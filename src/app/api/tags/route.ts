import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { tagCreateSchema } from '@/lib/validators';
import { handleApiError, UnauthorizedError, ConflictError } from '@/lib/errors';

export async function GET() {
  try {
    const authUser = await getCurrentUser();
    if (!authUser) {
      throw new UnauthorizedError();
    }

    const tags = await prisma.tag.findMany({
      where: { userId: authUser.userId },
      include: {
        _count: {
          select: { qrCodes: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    const formattedTags = tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      color: tag.color,
      createdAt: tag.createdAt.toISOString(),
      qrCodeCount: tag._count.qrCodes,
    }));

    return NextResponse.json({
      success: true,
      data: formattedTags,
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
    const data = tagCreateSchema.parse(body);

    const existingTag = await prisma.tag.findUnique({
      where: {
        name_userId: {
          name: data.name,
          userId: authUser.userId,
        },
      },
    });

    if (existingTag) {
      throw new ConflictError('Тег з такою назвою вже існує');
    }

    const tag = await prisma.tag.create({
      data: {
        name: data.name,
        color: data.color,
        userId: authUser.userId,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: tag.id,
        name: tag.name,
        color: tag.color,
        createdAt: tag.createdAt.toISOString(),
      },
      message: 'Тег успішно створено',
    }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
