'use client';

import { QrCodeResponse } from '@/types';
import QrCard from './QrCard';
import Spinner from '@/components/ui/Spinner';

interface QrListProps {
  qrCodes: QrCodeResponse[];
  isLoading: boolean;
  onToggleFavorite: (id: string, isFavorite: boolean) => void;
  onDelete: (id: string) => void;
  onView: (qrCode: QrCodeResponse) => void;
}

export default function QrList({
  qrCodes,
  isLoading,
  onToggleFavorite,
  onDelete,
  onView,
}: QrListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (qrCodes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-800/50 mb-4">
          <svg className="h-10 w-10 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-slate-300">QR-коди не знайдено</h3>
        <p className="mt-1 text-sm text-slate-500">Створіть свій перший QR-код на сторінці генератора</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {qrCodes.map((qrCode) => (
        <QrCard
          key={qrCode.id}
          qrCode={qrCode}
          onToggleFavorite={onToggleFavorite}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
}
