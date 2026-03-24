'use client';

import Image from 'next/image';
import { QrCodeResponse } from '@/types';
import { formatDate, truncateText, downloadDataUrl } from '@/lib/utils';
import { getContentTypeLabel } from '@/lib/qr-generator';
import Badge from '@/components/ui/Badge';
import Dropdown, { DropdownItem } from '@/components/ui/Dropdown';
import { QrContentType } from '@/types';

interface QrCardProps {
  qrCode: QrCodeResponse;
  onToggleFavorite: (id: string, isFavorite: boolean) => void;
  onDelete: (id: string) => void;
  onView: (qrCode: QrCodeResponse) => void;
}

export default function QrCard({ qrCode, onToggleFavorite, onDelete, onView }: QrCardProps) {
  const handleDownload = () => {
    downloadDataUrl(qrCode.qrDataUrl, `${qrCode.title}.png`);
  };

  return (
    <div
      onClick={() => onView(qrCode)}
      className="group relative rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm overflow-hidden hover:border-slate-600 hover:bg-slate-800/80 transition-all duration-200 cursor-pointer"
    >
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(qrCode.id, qrCode.isFavorite);
          }}
          className={`
            rounded-lg p-1.5 transition-colors
            ${qrCode.isFavorite
              ? 'text-amber-400 bg-amber-400/10'
              : 'text-slate-400 hover:text-amber-400 hover:bg-slate-700/50'
            }
          `}
        >
          <svg className="h-4 w-4" fill={qrCode.isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </button>
        <Dropdown
          trigger={
            <button
              onClick={(e) => e.stopPropagation()}
              className="rounded-lg p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          }
        >
          <DropdownItem onClick={handleDownload}>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            Завантажити
          </DropdownItem>
          <DropdownItem onClick={() => onDelete(qrCode.id)} danger>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Видалити
          </DropdownItem>
        </Dropdown>
      </div>

      <div className="flex items-center justify-center bg-slate-900/50 p-4">
        <div className="rounded-lg bg-white p-2">
          <Image
            src={qrCode.qrDataUrl}
            alt={qrCode.title}
            width={120}
            height={120}
            className="h-[120px] w-[120px]"
            unoptimized
          />
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-slate-200 text-sm truncate">{qrCode.title}</h3>
          {qrCode.isFavorite && (
            <svg className="h-4 w-4 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          )}
        </div>
        <p className="text-xs text-slate-500">{truncateText(qrCode.content, 50)}</p>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center rounded-md bg-slate-700/50 px-2 py-0.5 text-[10px] font-medium text-slate-400">
            {getContentTypeLabel(qrCode.contentType as QrContentType)}
          </span>
          <span className="text-[10px] text-slate-600">{formatDate(qrCode.createdAt)}</span>
        </div>
        {qrCode.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {qrCode.tags.slice(0, 3).map((tag) => (
              <Badge key={tag.id} color={tag.color}>
                {tag.name}
              </Badge>
            ))}
            {qrCode.tags.length > 3 && (
              <span className="text-[10px] text-slate-500">+{qrCode.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
