'use client';

import { useState } from 'react';
import { TagResponse } from '@/types';
import Badge from '@/components/ui/Badge';
import { TAG_COLORS } from '@/lib/constants';

interface TagSelectorProps {
  availableTags: (TagResponse & { qrCodeCount?: number })[];
  selectedTagIds: string[];
  onToggle: (tagId: string) => void;
  onCreateTag: (name: string, color: string) => Promise<void>;
}

export default function TagSelector({ availableTags, selectedTagIds, onToggle, onCreateTag }: TagSelectorProps) {
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState(TAG_COLORS[0]);
  const [isCreating, setIsCreating] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const handleCreate = async () => {
    if (!newTagName.trim()) return;
    setIsCreating(true);
    try {
      await onCreateTag(newTagName.trim(), newTagColor);
      setNewTagName('');
      setShowCreate(false);
    } catch {
      /* handled by parent */
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <button key={tag.id} onClick={() => onToggle(tag.id)}>
            <Badge color={tag.color} className={selectedTagIds.includes(tag.id) ? 'ring-2 ring-white/30' : 'opacity-60 hover:opacity-100'}>
              {tag.name}
            </Badge>
          </button>
        ))}
        <button onClick={() => setShowCreate(!showCreate)} className="inline-flex items-center gap-1 rounded-full border border-dashed border-slate-600 px-2.5 py-0.5 text-xs text-slate-500 hover:text-slate-300 hover:border-slate-400 transition-colors">
          + Новий тег
        </button>
      </div>

      {showCreate && (
        <div className="flex flex-col gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 mt-2">
          <input value={newTagName} onChange={(e) => setNewTagName(e.target.value)} placeholder="Назва тегу" className="w-full bg-slate-900/50 px-3 py-2 rounded-md text-sm text-slate-200 placeholder:text-slate-500 outline-none border border-slate-700/50 focus:border-indigo-500" onKeyDown={(e) => e.key === 'Enter' && handleCreate()} />
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {TAG_COLORS.slice(0, 6).map((c) => (
                <button key={c} onClick={() => setNewTagColor(c)} className={`h-5 w-5 rounded-full border-2 ${newTagColor === c ? 'border-white' : 'border-transparent'} flex-shrink-0`} style={{ backgroundColor: c }} />
              ))}
            </div>
            <button onClick={handleCreate} disabled={isCreating || !newTagName.trim()} className="text-xs font-medium bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-slate-700 disabled:text-slate-500 px-3 py-1.5 rounded-md transition-colors flex-shrink-0">
              {isCreating ? '...' : 'Додати'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
