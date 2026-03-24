'use client';

import React, { useState } from 'react';
import { useToast } from '@/hooks/useToast';
import { QR_CONTENT_TYPES, ERROR_CORRECTION_LEVELS, QR_SIZES, DEFAULT_QR_CONFIG } from '@/lib/constants';
import { QrContentType, ErrorCorrectionLevel } from '@/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ColorPicker from '@/components/ui/ColorPicker';

interface QrFormProps {
  onGenerate: (data: QrFormData) => void;
  onSave?: (data: QrFormData) => void;
  isLoading?: boolean;
  isSaving?: boolean;
  isAuthenticated?: boolean;
}

export interface QrFormData {
  content: string;
  contentType: QrContentType;
  title: string;
  description: string;
  foregroundColor: string;
  backgroundColor: string;
  size: number;
  errorCorrectionLevel: ErrorCorrectionLevel;
}

export default function QrForm({
  onGenerate,
  onSave,
  isLoading = false,
  isSaving = false,
  isAuthenticated = false,
}: QrFormProps) {
  const toast = useToast();
  const [formData, setFormData] = useState<QrFormData>({
    content: '',
    contentType: DEFAULT_QR_CONFIG.contentType,
    title: '',
    description: '',
    foregroundColor: DEFAULT_QR_CONFIG.foregroundColor,
    backgroundColor: DEFAULT_QR_CONFIG.backgroundColor,
    size: DEFAULT_QR_CONFIG.size,
    errorCorrectionLevel: DEFAULT_QR_CONFIG.errorCorrectionLevel,
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateField = <K extends keyof QrFormData>(field: K, value: QrFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    if (!formData.content.trim()) {
      toast.error('Введіть вміст для QR-коду');
      return;
    }
    onGenerate(formData);
  };

  const handleSave = () => {
    if (!formData.content.trim()) {
      toast.error('Введіть вміст для QR-коду');
      return;
    }
    if (!formData.title.trim()) {
      toast.error('Введіть назву QR-коду');
      return;
    }
    onSave?.(formData);
  };

  const getContentPlaceholder = (): string => {
    const placeholders: Record<QrContentType, string> = {
      text: 'Введіть текст...',
      url: 'https://example.com',
      email: 'user@example.com',
      phone: '+380501234567',
      wifi: '{"ssid":"MyNetwork","password":"pass123","encryption":"WPA","hidden":false}',
      vcard: '{"firstName":"Іван","lastName":"Петренко","phone":"+380501234567","email":"ivan@example.com"}',
    };
    return placeholders[formData.contentType];
  };

  const getContentLabel = (): string => {
    const labels: Record<QrContentType, string> = {
      text: 'Текст',
      url: 'URL-адреса',
      email: 'Електронна пошта',
      phone: 'Номер телефону',
      wifi: 'Налаштування Wi-Fi (JSON)',
      vcard: 'Дані візитки (JSON)',
    };
    return labels[formData.contentType];
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Тип вмісту</label>
        <div className="flex flex-wrap gap-2">
          {QR_CONTENT_TYPES.map((type) => (
            <button
              key={type.value}
              onClick={() => updateField('contentType', type.value as QrContentType)}
              className={`
                rounded-lg px-3 py-2 text-sm font-medium transition-all whitespace-nowrap flex-1 text-center min-w-[max-content]
                ${formData.contentType === type.value
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }
              `}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        {formData.contentType === 'wifi' || formData.contentType === 'vcard' ? (
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-300">{getContentLabel()}</label>
            <textarea
              value={formData.content}
              onChange={(e) => updateField('content', e.target.value)}
              placeholder={getContentPlaceholder()}
              rows={4}
              className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono"
            />
          </div>
        ) : (
          <Input
            label={getContentLabel()}
            value={formData.content}
            onChange={(e) => updateField('content', e.target.value)}
            placeholder={getContentPlaceholder()}
          />
        )}
      </div>

      {isAuthenticated && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Назва"
            value={formData.title}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Мій QR-код"
          />
          <Input
            label="Опис (необов'язково)"
            value={formData.description}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="Короткий опис..."
          />
        </div>
      )}

      <div>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
        >
          <svg
            className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          Додаткові налаштування
        </button>

        {showAdvanced && (
          <div className="mt-4 space-y-4 rounded-lg border border-slate-700/50 bg-slate-800/30 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ColorPicker
                label="Колір QR-коду"
                value={formData.foregroundColor}
                onChange={(color) => updateField('foregroundColor', color)}
              />
              <ColorPicker
                label="Колір фону"
                value={formData.backgroundColor}
                onChange={(color) => updateField('backgroundColor', color)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Розмір</label>
              <div className="flex flex-wrap gap-2">
                {QR_SIZES.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => updateField('size', s.value)}
                    className={`
                      rounded-lg px-3 py-1.5 text-xs font-medium transition-all
                      ${formData.size === s.value
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
                      }
                    `}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Рівень корекції помилок</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ERROR_CORRECTION_LEVELS.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => updateField('errorCorrectionLevel', level.value as ErrorCorrectionLevel)}
                    className={`
                      rounded-lg px-3 py-2 text-left transition-all
                      ${formData.errorCorrectionLevel === level.value
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
                      }
                    `}
                  >
                    <div className="text-xs font-medium">{level.label}</div>
                    <div className="text-[10px] opacity-70">{level.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button onClick={handleGenerate} isLoading={isLoading} fullWidth>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
          Згенерувати
        </Button>
        {isAuthenticated && onSave && (
          <Button onClick={handleSave} variant="secondary" isLoading={isSaving}>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Зберегти
          </Button>
        )}
      </div>
    </div>
  );
}
