'use client';

import { useState, useCallback } from 'react';
import { FolderResponse } from '@/types';

export function useFolders() {
  const [folders, setFolders] = useState<FolderResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFolders = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/folders');
      const result = await response.json();

      if (result.success) {
        setFolders(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch folders:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createFolder = useCallback(async (name: string, parentId?: string) => {
    const response = await fetch('/api/folders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, parentId: parentId || null }),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Помилка створення папки');
    }

    return result.data as FolderResponse;
  }, []);

  const updateFolder = useCallback(async (id: string, data: { name?: string; parentId?: string | null }) => {
    const response = await fetch(`/api/folders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Помилка оновлення папки');
    }

    return result.data as FolderResponse;
  }, []);

  const deleteFolder = useCallback(async (id: string) => {
    const response = await fetch(`/api/folders/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Помилка видалення папки');
    }
  }, []);

  return {
    folders,
    isLoading,
    fetchFolders,
    createFolder,
    updateFolder,
    deleteFolder,
  };
}
