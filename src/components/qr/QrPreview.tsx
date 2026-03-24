'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button';
import { downloadDataUrl } from '@/lib/utils';

interface QrPreviewProps {
  dataUrl: string | null;
  title?: string;
  isLoading?: boolean;
}

export default function QrPreview({ dataUrl, title = 'qr-code', isLoading = false }: QrPreviewProps) {
  const handleDownloadPng = () => {
    if (dataUrl) {
      downloadDataUrl(dataUrl, `${title}.png`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-slate-700/50 bg-slate-800/30 p-8">
        <div className="h-48 w-48 animate-pulse rounded-lg bg-slate-700/50" />
        <p className="mt-4 text-sm text-slate-500">Генерація QR-коду...</p>
      </div>
    );
  }

  if (!dataUrl) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-800/20 p-12 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-800/50 mb-4">
          <svg className="h-10 w-10 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
        </div>
        <p className="text-slate-400 text-sm">Введіть дані та натисніть &quot;Згенерувати&quot;</p>
        <p className="text-slate-600 text-xs mt-1">QR-код з&apos;явиться тут</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center rounded-xl border border-slate-700/50 bg-slate-800/30 p-6 space-y-4">
      <div className="rounded-lg bg-white p-4 shadow-xl">
        <Image
          src={dataUrl}
          alt="QR Code"
          width={280}
          height={280}
          className="h-auto w-full max-w-[280px]"
          unoptimized
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={handleDownloadPng} variant="secondary" size="sm">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Завантажити PNG
        </Button>
      </div>
    </div>
  );
}
