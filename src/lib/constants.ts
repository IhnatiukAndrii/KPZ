export const APP_NAME = 'QR Generator';

export const QR_CONTENT_TYPES = [
  { value: 'text', label: 'Текст' },
  { value: 'url', label: 'URL-адреса' },
  { value: 'email', label: 'Електронна пошта' },
  { value: 'phone', label: 'Телефон' },
  { value: 'wifi', label: 'Wi-Fi' },
  { value: 'vcard', label: 'Візитна картка' },
] as const;

export const ERROR_CORRECTION_LEVELS = [
  { value: 'L', label: 'Низький (7%)', description: 'Найменший розмір QR-коду' },
  { value: 'M', label: 'Середній (15%)', description: 'Баланс розміру та надійності' },
  { value: 'Q', label: 'Високий (25%)', description: 'Висока надійність' },
  { value: 'H', label: 'Максимальний (30%)', description: 'Найвища надійність' },
] as const;

export const QR_SIZES = [
  { value: 200, label: '200×200' },
  { value: 300, label: '300×300' },
  { value: 400, label: '400×400' },
  { value: 500, label: '500×500' },
  { value: 600, label: '600×600' },
] as const;

export const DEFAULT_QR_CONFIG = {
  foregroundColor: '#000000',
  backgroundColor: '#FFFFFF',
  size: 300,
  errorCorrectionLevel: 'M' as const,
  contentType: 'text' as const,
};

export const PAGINATION_DEFAULTS = {
  page: 1,
  limit: 12,
  maxLimit: 50,
};

export const TAG_COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#84cc16',
  '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6',
  '#6366f1', '#8b5cf6', '#a855f7', '#ec4899',
];

export const JWT_EXPIRY = '7d';

export const PASSWORD_MIN_LENGTH = 6;
export const TITLE_MAX_LENGTH = 100;
export const DESCRIPTION_MAX_LENGTH = 500;
export const CONTENT_MAX_LENGTH = 4000;
export const TAG_NAME_MAX_LENGTH = 30;
export const FOLDER_NAME_MAX_LENGTH = 50;
