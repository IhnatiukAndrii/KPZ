'use client';

import { useState, useCallback } from 'react';
import { TagResponse } from '@/types';

export function useTags() {
  const [tags, setTags] = useState<(TagResponse & { qrCodeCount?: number })[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTags = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/tags');
      const result = await response.json();

      if (result.success) {
        setTags(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch tags:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTag = useCallback(async (name: string, color: string) => {
    const response = await fetch('/api/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, color }),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Помилка створення тегу');
    }

    return result.data as TagResponse;
  }, []);

  const updateTag = useCallback(async (id: string, data: { name?: string; color?: string }) => {
    const response = await fetch(`/api/tags/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Помилка оновлення тегу');
    }

    return result.data as TagResponse;
  }, []);

  const deleteTag = useCallback(async (id: string) => {
    const response = await fetch(`/api/tags/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Помилка видалення тегу');
    }
  }, []);

  return {
    tags,
    isLoading,
    fetchTags,
    createTag,
    updateTag,
    deleteTag,
  };
}
