'use client';

import { useState, useCallback } from 'react';
import { QrCodeResponse, QrFilterParams, PaginatedResponse } from '@/types';
import { buildQueryString } from '@/lib/utils';

export function useQrCodes() {
  const [qrCodes, setQrCodes] = useState<QrCodeResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });

  const fetchQrCodes = useCallback(async (filters?: QrFilterParams) => {
    setIsLoading(true);
    try {
      const queryString = buildQueryString({
        search: filters?.search,
        contentType: filters?.contentType,
        isFavorite: filters?.isFavorite?.toString(),
        folderId: filters?.folderId,
        tagId: filters?.tagId,
        sortBy: filters?.sortBy,
        sortOrder: filters?.sortOrder,
        page: filters?.page,
        limit: filters?.limit,
      });

      const response = await fetch(`/api/qr${queryString}`);
      const result: PaginatedResponse<QrCodeResponse> = await response.json();

      if (result.success && result.data) {
        setQrCodes(result.data);
        setPagination(result.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch QR codes:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createQrCode = useCallback(async (data: Record<string, unknown>) => {
    const response = await fetch('/api/qr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Помилка створення QR-коду');
    }

    return result.data as QrCodeResponse;
  }, []);

  const updateQrCode = useCallback(async (id: string, data: Record<string, unknown>) => {
    const response = await fetch(`/api/qr/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Помилка оновлення QR-коду');
    }

    return result.data as QrCodeResponse;
  }, []);

  const deleteQrCode = useCallback(async (id: string) => {
    const response = await fetch(`/api/qr/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Помилка видалення QR-коду');
    }
  }, []);

  const toggleFavorite = useCallback(async (id: string, isFavorite: boolean) => {
    return updateQrCode(id, { isFavorite: !isFavorite });
  }, [updateQrCode]);

  return {
    qrCodes,
    isLoading,
    pagination,
    fetchQrCodes,
    createQrCode,
    updateQrCode,
    deleteQrCode,
    toggleFavorite,
  };
}
