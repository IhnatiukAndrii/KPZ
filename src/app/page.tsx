'use client';

import { useState, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import QrForm, { QrFormData } from '@/components/qr/QrForm';
import QrPreview from '@/components/qr/QrPreview';

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const toast = useToast();
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleGenerate = useCallback(async (data: QrFormData) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/qr/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: data.content,
          contentType: data.contentType,
          foregroundColor: data.foregroundColor,
          backgroundColor: data.backgroundColor,
          size: data.size,
          errorCorrectionLevel: data.errorCorrectionLevel,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setQrDataUrl(result.data.qrDataUrl);
        toast.success('QR-код згенеровано');
      } else {
        toast.error(result.error || 'Помилка генерації');
      }
    } catch {
      toast.error('Помилка з\'єднання з сервером');
    } finally {
      setIsGenerating(false);
    }
  }, [toast]);

  const handleSave = useCallback(async (data: QrFormData) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: data.content,
          contentType: data.contentType,
          title: data.title || 'Без назви',
          description: data.description || null,
          foregroundColor: data.foregroundColor,
          backgroundColor: data.backgroundColor,
          size: data.size,
          errorCorrectionLevel: data.errorCorrectionLevel,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setQrDataUrl(result.data.qrDataUrl);
        toast.success('QR-код збережено');
      } else {
        toast.error(result.error || 'Помилка збереження');
      }
    } catch {
      toast.error('Помилка з\'єднання з сервером');
    } finally {
      setIsSaving(false);
    }
  }, [toast]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
          Генератор QR-кодів
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Створюйте QR-коди для тексту, URL-адрес, контактів, Wi-Fi та багато іншого.
          Налаштовуйте кольори, розмір та рівень корекції помилок.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm p-6">
          <h2 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
            <svg className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Налаштування
          </h2>
          <QrForm
            onGenerate={handleGenerate}
            onSave={isAuthenticated ? handleSave : undefined}
            isLoading={isGenerating}
            isSaving={isSaving}
            isAuthenticated={isAuthenticated}
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
            <svg className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Попередній перегляд
          </h2>
          <QrPreview dataUrl={qrDataUrl} isLoading={isGenerating} />
        </div>
      </div>
    </div>
  );
}
