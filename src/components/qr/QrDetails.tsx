'use client';

import Image from 'next/image';
import { QrCodeResponse, QrContentType } from '@/types';
import { formatDate, downloadDataUrl } from '@/lib/utils';
import { getContentTypeLabel } from '@/lib/qr-generator';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

interface QrDetailsProps {
  qrCode: QrCodeResponse | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleFavorite: (id: string, isFavorite: boolean) => void;
  onDelete: (id: string) => void;
}

export default function QrDetails({
  qrCode,
  isOpen,
  onClose,
  onToggleFavorite,
  onDelete,
}: QrDetailsProps) {
  if (!qrCode) return null;

  const handleDownload = () => {
    downloadDataUrl(qrCode.qrDataUrl, `${qrCode.title}.png`);
  };

  const handleDelete = () => {
    onDelete(qrCode.id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={qrCode.title} size="lg">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-shrink-0 flex justify-center">
            <div className="rounded-lg bg-white p-3 shadow-xl">
              <Image
                src={qrCode.qrDataUrl}
                alt={qrCode.title}
                width={200}
                height={200}
                className="h-[200px] w-[200px]"
                unoptimized
              />
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Тип</label>
              <p className="text-sm text-slate-300 mt-0.5">
                {getContentTypeLabel(qrCode.contentType as QrContentType)}
              </p>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Вміст</label>
              <p className="text-sm text-slate-300 mt-0.5 break-all font-mono bg-slate-900/50 rounded-md px-2 py-1">
                {qrCode.content}
              </p>
            </div>

            {qrCode.description && (
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Опис</label>
                <p className="text-sm text-slate-300 mt-0.5">{qrCode.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Розмір</label>
                <p className="text-sm text-slate-300 mt-0.5">{qrCode.size}×{qrCode.size}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Корекція</label>
                <p className="text-sm text-slate-300 mt-0.5">{qrCode.errorCorrectionLevel}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Кольори</label>
                <div className="flex items-center gap-2 mt-0.5">
                  <div
                    className="h-6 w-6 rounded border border-slate-600"
                    style={{ backgroundColor: qrCode.foregroundColor }}
                    title={`QR: ${qrCode.foregroundColor}`}
                  />
                  <div
                    className="h-6 w-6 rounded border border-slate-600"
                    style={{ backgroundColor: qrCode.backgroundColor }}
                    title={`Фон: ${qrCode.backgroundColor}`}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Створено</label>
              <p className="text-sm text-slate-300 mt-0.5">{formatDate(qrCode.createdAt)}</p>
            </div>

            {qrCode.tags.length > 0 && (
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Теги</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {qrCode.tags.map((tag) => (
                    <Badge key={tag.id} color={tag.color}>{tag.name}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-700 pt-4">
          <div className="flex gap-2">
            <Button onClick={handleDownload} size="sm">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              Завантажити
            </Button>
            <Button
              onClick={() => onToggleFavorite(qrCode.id, qrCode.isFavorite)}
              variant={qrCode.isFavorite ? 'secondary' : 'outline'}
              size="sm"
            >
              <svg className="h-4 w-4" fill={qrCode.isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              {qrCode.isFavorite ? 'В обраному' : 'До обраного'}
            </Button>
          </div>
          <Button onClick={handleDelete} variant="danger" size="sm">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Видалити
          </Button>
        </div>
      </div>
    </Modal>
  );
}
