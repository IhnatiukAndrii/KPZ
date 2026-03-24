'use client';

import { useState } from 'react';
import { FolderResponse } from '@/types';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';

interface FolderTreeProps {
  folders: FolderResponse[];
  selectedFolderId?: string | null;
  onSelectFolder: (folderId: string | null) => void;
  onCreateFolder: (name: string, parentId?: string) => Promise<void>;
  onDeleteFolder: (id: string) => Promise<void>;
}

export default function FolderTree({ folders, selectedFolderId, onSelectFolder, onCreateFolder, onDeleteFolder }: FolderTreeProps) {
  const [showCreate, setShowCreate] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderParent, setNewFolderParent] = useState<string | undefined>();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    if (!newFolderName.trim()) return;
    setIsCreating(true);
    try {
      await onCreateFolder(newFolderName.trim(), newFolderParent);
      setNewFolderName('');
      setShowCreate(false);
    } catch {
      /* handled */
    } finally {
      setIsCreating(false);
    }
  };

  const renderFolder = (folder: FolderResponse, depth = 0) => (
    <div key={folder.id}>
      <div className={`flex items-center gap-2 group rounded-lg px-3 py-2 cursor-pointer transition-colors ${selectedFolderId === folder.id ? 'bg-indigo-600/20 text-indigo-300' : 'text-slate-400 hover:bg-slate-700/30 hover:text-slate-200'}`} style={{ paddingLeft: `${12 + depth * 16}px` }}>
        <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
        <span className="flex-1 text-sm truncate" onClick={() => onSelectFolder(folder.id)}>{folder.name}</span>
        <span className="text-[10px] text-slate-600">{(folder as unknown as Record<string, number>).qrCodeCount || 0}</span>
        <button onClick={(e) => { e.stopPropagation(); onDeleteFolder(folder.id); }} className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      {folder.children?.map((child) => renderFolder(child, depth + 1))}
    </div>
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-3">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Папки</h3>
        <button onClick={() => setShowCreate(true)} className="text-xs text-indigo-400 hover:text-indigo-300">+ Нова</button>
      </div>

      <button onClick={() => onSelectFolder(null)} className={`flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm transition-colors ${selectedFolderId === null ? 'bg-indigo-600/20 text-indigo-300' : 'text-slate-400 hover:bg-slate-700/30'}`}>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
        Усі QR-коди
      </button>

      {folders.map((f) => renderFolder(f))}

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Нова папка" size="sm">
        <div className="space-y-4">
          <Input label="Назва папки" value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} placeholder="Моя папка" />
          {folders.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Батьківська папка</label>
              <select value={newFolderParent || ''} onChange={(e) => setNewFolderParent(e.target.value || undefined)} className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2 text-sm text-slate-200">
                <option value="">Кореневий рівень</option>
                {folders.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
              </select>
            </div>
          )}
          <Button onClick={handleCreate} isLoading={isCreating} fullWidth>Створити</Button>
        </div>
      </Modal>
    </div>
  );
}
