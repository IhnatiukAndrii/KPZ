import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { folderCreateSchema } from '@/lib/validators';
import { handleApiError, UnauthorizedError } from '@/lib/errors';

export async function GET() {
  try {
    const authUser = await getCurrentUser();
    if (!authUser) {
      throw new UnauthorizedError();
    }

    const folders = await prisma.folder.findMany({
      where: { userId: authUser.userId },
      include: {
        _count: {
          select: { qrCodes: true, children: true },
        },
        children: {
          include: {
            _count: {
              select: { qrCodes: true, children: true },
            },
          },
          orderBy: { name: 'asc' },
        },
      },
      orderBy: { name: 'asc' },
    });

    const rootFolders = folders.filter((f) => f.parentId === null);

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const formatFolder = (folder: any): object => ({
      id: folder.id,
      name: folder.name,
      parentId: folder.parentId,
      createdAt: folder.createdAt.toISOString(),
      updatedAt: folder.updatedAt.toISOString(),
      qrCodeCount: folder._count.qrCodes,
      childCount: folder._count.children,
      children: folder.children?.map(formatFolder) || [],
    });
    /* eslint-enable @typescript-eslint/no-explicit-any */

    return NextResponse.json({
      success: true,
      data: rootFolders.map(formatFolder),
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
    const data = folderCreateSchema.parse(body);

    if (data.parentId) {
      const parentFolder = await prisma.folder.findUnique({
        where: { id: data.parentId },
      });

      if (!parentFolder || parentFolder.userId !== authUser.userId) {
        return NextResponse.json(
          { success: false, error: 'Батьківська папка не знайдена' },
          { status: 404 }
        );
      }
    }

    const folder = await prisma.folder.create({
      data: {
        name: data.name,
        userId: authUser.userId,
        parentId: data.parentId || null,
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
      message: 'Папку успішно створено',
    }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
