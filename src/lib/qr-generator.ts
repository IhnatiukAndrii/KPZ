import QRCode from 'qrcode';
import { ErrorCorrectionLevel, QrContentType, WifiConfig, VCardData } from '@/types';

interface QrGenerationOptions {
  content: string;
  foregroundColor?: string;
  backgroundColor?: string;
  size?: number;
  errorCorrectionLevel?: ErrorCorrectionLevel;
  margin?: number;
}

export async function generateQrDataUrl(options: QrGenerationOptions): Promise<string> {
  const {
    content,
    foregroundColor = '#000000',
    backgroundColor = '#FFFFFF',
    size = 300,
    errorCorrectionLevel = 'M',
    margin = 2,
  } = options;

  const dataUrl = await QRCode.toDataURL(content, {
    width: size,
    margin,
    color: {
      dark: foregroundColor,
      light: backgroundColor,
    },
    errorCorrectionLevel,
  });

  return dataUrl;
}

export async function generateQrSvg(options: QrGenerationOptions): Promise<string> {
  const {
    content,
    foregroundColor = '#000000',
    backgroundColor = '#FFFFFF',
    errorCorrectionLevel = 'M',
    margin = 2,
  } = options;

  const svg = await QRCode.toString(content, {
    type: 'svg',
    margin,
    color: {
      dark: foregroundColor,
      light: backgroundColor,
    },
    errorCorrectionLevel,
  });

  return svg;
}

export function formatContentForQr(
  contentType: QrContentType,
  content: string,
  metadata?: Record<string, string>
): string {
  switch (contentType) {
    case 'url':
      return formatUrl(content);
    case 'email':
      return formatEmail(content, metadata);
    case 'phone':
      return formatPhone(content);
    case 'wifi':
      return formatWifi(JSON.parse(content) as WifiConfig);
    case 'vcard':
      return formatVCard(JSON.parse(content) as VCardData);
    case 'text':
    default:
      return content;
  }
}

function formatUrl(url: string): string {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
}

function formatEmail(email: string, metadata?: Record<string, string>): string {
  const subject = metadata?.subject || '';
  const body = metadata?.body || '';
  let mailto = `mailto:${email}`;
  const params: string[] = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  if (params.length > 0) {
    mailto += `?${params.join('&')}`;
  }
  return mailto;
}

function formatPhone(phone: string): string {
  return `tel:${phone.replace(/\s/g, '')}`;
}

function formatWifi(config: WifiConfig): string {
  const hidden = config.hidden ? 'H:true' : '';
  return `WIFI:T:${config.encryption};S:${config.ssid};P:${config.password};${hidden};`;
}

function formatVCard(data: VCardData): string {
  const lines: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${data.lastName};${data.firstName};;;`,
    `FN:${data.firstName} ${data.lastName}`,
  ];

  if (data.phone) lines.push(`TEL:${data.phone}`);
  if (data.email) lines.push(`EMAIL:${data.email}`);
  if (data.organization) lines.push(`ORG:${data.organization}`);
  if (data.title) lines.push(`TITLE:${data.title}`);
  if (data.url) lines.push(`URL:${data.url}`);
  if (data.address) lines.push(`ADR:;;${data.address};;;;`);

  lines.push('END:VCARD');
  return lines.join('\n');
}

export function getContentTypeLabel(contentType: QrContentType): string {
  const labels: Record<QrContentType, string> = {
    text: 'Текст',
    url: 'URL-адреса',
    email: 'Електронна пошта',
    phone: 'Телефон',
    wifi: 'Wi-Fi',
    vcard: 'Візитна картка',
  };
  return labels[contentType] || contentType;
}

export function detectContentType(content: string): QrContentType {
  const urlPattern = /^(https?:\/\/|www\.)/i;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\+?[\d\s\-()]{7,15}$/;

  if (urlPattern.test(content)) return 'url';
  if (emailPattern.test(content)) return 'email';
  if (phonePattern.test(content)) return 'phone';
  return 'text';
}
