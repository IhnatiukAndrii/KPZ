'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useQrCodes } from '@/hooks/useQrCodes';
import { useTags } from '@/hooks/useTags';
import { useFolders } from '@/hooks/useFolders';
import { useToast } from '@/hooks/useToast';
import { useDebounce } from '@/hooks/useDebounce';
import { QrCodeResponse, QrContentType, QrFilterParams } from '@/types';
import { QR_CONTENT_TYPES } from '@/lib/constants';
import QrList from '@/components/qr/QrList';
import QrDetails from '@/components/qr/QrDetails';
import QrStats from '@/components/qr/QrStats';
import FolderTree from '@/components/folders/FolderTree';
import TagSelector from '@/components/tags/TagSelector';
import Pagination from '@/components/ui/Pagination';
import Input from '@/components/ui/Input';
import Spinner from '@/components/ui/Spinner';

export default function DashboardPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { qrCodes, isLoading, pagination, fetchQrCodes, toggleFavorite, deleteQrCode } = useQrCodes();
  const { tags, fetchTags, createTag } = useTags();
  const { folders, fetchFolders, createFolder, deleteFolder } = useFolders();
  const toast = useToast();

  const [search, setSearch] = useState('');
  const [selectedContentType, setSelectedContentType] = useState<string>('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [selectedTagId, setSelectedTagId] = useState<string>('');
  const [sortBy, setSortBy] = useState<QrFilterParams['sortBy']>('createdAt');
  const [sortOrder, setSortOrder] = useState<QrFilterParams['sortOrder']>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQr, setSelectedQr] = useState<QrCodeResponse | null>(null);
  const [activeTab, setActiveTab] = useState<'codes' | 'stats'>('codes');

  const debouncedSearch = useDebounce(search);

  const loadData = useCallback(async () => {
    await fetchQrCodes({
      search: debouncedSearch || undefined,
      contentType: selectedContentType as QrContentType || undefined,
      isFavorite: showFavorites || undefined,
      folderId: selectedFolderId || undefined,
      tagId: selectedTagId || undefined,
      sortBy,
      sortOrder,
      page: currentPage,
    });
  }, [fetchQrCodes, debouncedSearch, selectedContentType, showFavorites, selectedFolderId, selectedTagId, sortBy, sortOrder, currentPage]);

  useEffect(() => { if (isAuthenticated) { loadData(); fetchTags(); fetchFolders(); } }, [isAuthenticated, loadData, fetchTags, fetchFolders]);

  const handleToggleFavorite = async (id: string, isFavorite: boolean) => {
    try { await toggleFavorite(id, isFavorite); toast.success(isFavorite ? 'Видалено з обраного' : 'Додано до обраного'); loadData(); } catch { toast.error('Помилка'); }
  };

  const handleDelete = async (id: string) => {
    try { await deleteQrCode(id); toast.success('QR-код видалено'); setSelectedQr(null); loadData(); } catch { toast.error('Помилка видалення'); }
  };

  const handleCreateTag = async (name: string, color: string) => {
    await createTag(name, color); toast.success('Тег створено'); fetchTags();
  };

  const handleCreateFolder = async (name: string, parentId?: string) => {
    await createFolder(name, parentId); toast.success('Папку створено'); fetchFolders();
  };

  const handleDeleteFolder = async (id: string) => {
    await deleteFolder(id); toast.success('Папку видалено'); fetchFolders(); if (selectedFolderId === id) setSelectedFolderId(null);
  };

  if (authLoading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  if (!isAuthenticated) { if (typeof window !== 'undefined') window.location.href = '/auth/login'; return null; }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Мої QR-коди</h1>
        <div className="flex gap-2">
          {(['codes', 'stats'] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-700/50'}`}>
              {tab === 'codes' ? 'QR-коди' : 'Статистика'}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'stats' ? <QrStats /> : (
        <div className="flex gap-6">
          <aside className="hidden lg:block w-64 flex-shrink-0 space-y-6">
            <FolderTree folders={folders} selectedFolderId={selectedFolderId} onSelectFolder={setSelectedFolderId} onCreateFolder={handleCreateFolder} onDeleteFolder={handleDeleteFolder} />
            <div className="space-y-2">
              <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Теги</h3>
              <TagSelector availableTags={tags} selectedTagIds={selectedTagId ? [selectedTagId] : []} onToggle={(id) => setSelectedTagId(selectedTagId === id ? '' : id)} onCreateTag={handleCreateTag} />
            </div>
          </aside>

          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[200px]">
                <Input value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} placeholder="Пошук QR-кодів..." />
              </div>
              <select value={selectedContentType} onChange={(e) => { setSelectedContentType(e.target.value); setCurrentPage(1); }} className="rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-2.5 text-sm text-slate-200">
                <option value="">Усі типи</option>
                {QR_CONTENT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              <button onClick={() => { setShowFavorites(!showFavorites); setCurrentPage(1); }} className={`rounded-lg px-3 py-2.5 text-sm transition-colors ${showFavorites ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50' : 'border border-slate-600 text-slate-400 hover:text-slate-200'}`}>
                ★ Обране
              </button>
              <select value={`${sortBy}-${sortOrder}`} onChange={(e) => { const [sb, so] = e.target.value.split('-'); setSortBy(sb as QrFilterParams['sortBy']); setSortOrder(so as QrFilterParams['sortOrder']); }} className="rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-2.5 text-sm text-slate-200">
                <option value="createdAt-desc">Найновіші</option>
                <option value="createdAt-asc">Найстаріші</option>
                <option value="title-asc">A-Я</option>
                <option value="title-desc">Я-A</option>
                <option value="updatedAt-desc">Останні зміни</option>
              </select>
            </div>

            <QrList qrCodes={qrCodes} isLoading={isLoading} onToggleFavorite={handleToggleFavorite} onDelete={handleDelete} onView={setSelectedQr} />

            <Pagination currentPage={pagination.page} totalPages={pagination.totalPages} onPageChange={setCurrentPage} />
          </div>
        </div>
      )}

      <QrDetails qrCode={selectedQr} isOpen={!!selectedQr} onClose={() => setSelectedQr(null)} onToggleFavorite={handleToggleFavorite} onDelete={handleDelete} />
    </div>
  );
}
