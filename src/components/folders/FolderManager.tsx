'use client';

import { useState } from 'react';
import { FolderResponse } from '@/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';

interface FolderManagerProps {
  folders: FolderResponse[];
  onUpdate: (id: string, data: { name?: string }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function FolderManager({ folders, onUpdate, onDelete }: FolderManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const startEditing = (folder: FolderResponse) => {
    setEditingId(folder.id);
    setEditName(folder.name);
  };

  const handleSave = async () => {
    if (!editingId || !editName.trim()) return;
    await onUpdate(editingId, { name: editName.trim() });
    setEditingId(null);
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    await onDelete(deleteConfirmId);
    setDeleteConfirmId(null);
  };

  if (folders.length === 0) {
    return <p className="text-sm text-slate-500 text-center py-4">Папок ще немає</p>;
  }

  return (
    <div className="space-y-2">
      {folders.map((folder) => (
        <div key={folder.id} className="flex items-center gap-3 rounded-lg border border-slate-700/50 bg-slate-800/30 px-4 py-3">
          <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          {editingId === folder.id ? (
            <div className="flex-1 flex items-center gap-2">
              <Input value={editName} onChange={(e) => setEditName(e.target.value)} className="flex-1" />
              <Button onClick={handleSave} size="sm">Зберегти</Button>
              <Button onClick={() => setEditingId(null)} variant="ghost" size="sm">Скасувати</Button>
            </div>
          ) : (
            <>
              <span className="flex-1 text-sm text-slate-200">{folder.name}</span>
              <span className="text-xs text-slate-600">{(folder as unknown as Record<string, number>).qrCodeCount || 0} QR</span>
              <button onClick={() => startEditing(folder)} className="text-slate-500 hover:text-slate-300"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
              <button onClick={() => setDeleteConfirmId(folder.id)} className="text-slate-500 hover:text-red-400"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
            </>
          )}
        </div>
      ))}

      <Modal isOpen={!!deleteConfirmId} onClose={() => setDeleteConfirmId(null)} title="Видалити папку?" size="sm">
        <p className="text-sm text-slate-400 mb-4">QR-коди в цій папці не будуть видалені, але втратять прив&apos;язку до папки.</p>
        <div className="flex gap-2 justify-end">
          <Button onClick={() => setDeleteConfirmId(null)} variant="ghost" size="sm">Скасувати</Button>
          <Button onClick={handleDelete} variant="danger" size="sm">Видалити</Button>
        </div>
      </Modal>
    </div>
  );
}
