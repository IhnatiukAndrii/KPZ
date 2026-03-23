import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { handleApiError, UnauthorizedError } from '@/lib/errors';

export async function GET() {
  try {
    const authUser = await getCurrentUser();
    if (!authUser) {
      throw new UnauthorizedError();
    }

    const userId = authUser.userId;

    const totalCodes = await prisma.qrCode.count({ where: { userId } });
    const favoriteCount = await prisma.qrCode.count({
      where: { userId, isFavorite: true },
    });
    const tagCount = await prisma.tag.count({ where: { userId } });
    const folderCount = await prisma.folder.count({ where: { userId } });

    const contentTypeCounts = await prisma.qrCode.groupBy({
      by: ['contentType'],
      where: { userId },
      _count: { id: true },
    });

    const byContentType: Record<string, number> = {};
    contentTypeCounts.forEach((item) => {
      byContentType[item.contentType] = item._count.id;
    });

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentCodes = await prisma.qrCode.findMany({
      where: {
        userId,
        createdAt: { gte: thirtyDaysAgo },
      },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' },
    });

    const activityMap = new Map<string, number>();
    recentCodes.forEach((qr) => {
      const dateKey = qr.createdAt.toISOString().split('T')[0];
      activityMap.set(dateKey, (activityMap.get(dateKey) || 0) + 1);
    });

    const recentActivity = Array.from(activityMap.entries()).map(([date, count]) => ({
      date,
      count,
    }));

    return NextResponse.json({
      success: true,
      data: {
        totalCodes,
        favoriteCount,
        tagCount,
        folderCount,
        byContentType,
        recentActivity,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
