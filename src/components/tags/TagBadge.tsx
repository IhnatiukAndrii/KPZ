'use client';

import { TagResponse } from '@/types';
import Badge from '@/components/ui/Badge';

interface TagBadgeProps {
  tag: TagResponse;
  onRemove?: () => void;
  onClick?: () => void;
}

export default function TagBadge({ tag, onRemove, onClick }: TagBadgeProps) {
  return (
    <span onClick={onClick} className={onClick ? 'cursor-pointer' : ''}>
      <Badge color={tag.color} onRemove={onRemove}>
        {tag.name}
      </Badge>
    </span>
  );
}
