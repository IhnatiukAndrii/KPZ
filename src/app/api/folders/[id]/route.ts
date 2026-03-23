import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { folderUpdateSchema } from '@/lib/validators';
import { handleApiError, UnauthorizedError, NotFoundError, ForbiddenError } from '@/lib/errors';

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

    const folder = await prisma.folder.findUnique({
      where: { id },
      include: {
        children: {
          include: {
            _count: { select: { qrCodes: true, children: true } },
          },
          orderBy: { name: 'asc' },
        },
        qrCodes: {
          include: {
            tags: {
              include: { tag: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        _count: { select: { qrCodes: true, children: true } },
      },
    });

    if (!folder) {
      throw new NotFoundError('Папка');
    }

    if (folder.userId !== authUser.userId) {
      throw new ForbiddenError();
    }

    return NextResponse.json({
      success: true,
      data: {
        id: folder.id,
        name: folder.name,
        parentId: folder.parentId,
        createdAt: folder.createdAt.toISOString(),
        updatedAt: folder.updatedAt.toISOString(),
        qrCodeCount: folder._count.qrCodes,
        childCount: folder._count.children,
        children: folder.children.map((child) => ({
          id: child.id,
          name: child.name,
          parentId: child.parentId,
          qrCodeCount: child._count.qrCodes,
          childCount: child._count.children,
        })),
        qrCodes: folder.qrCodes.map((qr) => ({
          ...qr,
          createdAt: qr.createdAt.toISOString(),
          updatedAt: qr.updatedAt.toISOString(),
          tags: qr.tags.map((t) => ({
            id: t.tag.id,
            name: t.tag.name,
            color: t.tag.color,
            createdAt: t.tag.createdAt.toISOString(),
          })),
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
    const data = folderUpdateSchema.parse(body);

    const existingFolder = await prisma.folder.findUnique({
      where: { id },
    });

    if (!existingFolder) {
      throw new NotFoundError('Папка');
    }

    if (existingFolder.userId !== authUser.userId) {
      throw new ForbiddenError();
    }

    if (data.parentId && data.parentId === id) {
      return NextResponse.json(
        { success: false, error: 'Папка не може бути вкладена сама в себе' },
        { status: 400 }
      );
    }

    const folder = await prisma.folder.update({
      where: { id },
      data: {
        name: data.name,
        parentId: data.parentId,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: folder.id,
        name: folder.name,
        parentId: folder.parentId,
        createdAt: folder.createdAt.toISOString(),
        updatedAt: folder.updatedAt.toISOString(),
      },
      message: 'Папку успішно оновлено',
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

    const folder = await prisma.folder.findUnique({
      where: { id },
    });

    if (!folder) {
      throw new NotFoundError('Папка');
    }

    if (folder.userId !== authUser.userId) {
      throw new ForbiddenError();
    }

    await prisma.folder.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Папку успішно видалено',
    });
  } catch (error) {
    return handleApiError(error);
  }
}
