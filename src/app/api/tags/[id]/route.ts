import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { tagUpdateSchema } from '@/lib/validators';
import { handleApiError, UnauthorizedError, NotFoundError, ForbiddenError } from '@/lib/errors';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const authUser = await getCurrentUser();
    if (!authUser) {
      throw new UnauthorizedError();
    }

    const { id } = await params;
    const body = await request.json();
    const data = tagUpdateSchema.parse(body);

    const existingTag = await prisma.tag.findUnique({
      where: { id },
    });

    if (!existingTag) {
      throw new NotFoundError('Тег');
    }

    if (existingTag.userId !== authUser.userId) {
      throw new ForbiddenError();
    }

    const tag = await prisma.tag.update({
      where: { id },
      data: {
        name: data.name,
        color: data.color,
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
      message: 'Тег успішно оновлено',
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

    const tag = await prisma.tag.findUnique({
      where: { id },
    });

    if (!tag) {
      throw new NotFoundError('Тег');
    }

    if (tag.userId !== authUser.userId) {
      throw new ForbiddenError();
    }

    await prisma.tag.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Тег успішно видалено',
    });
  } catch (error) {
    return handleApiError(error);
  }
}
