export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface QrCodeFormData {
  content: string;
  contentType: QrContentType;
  title: string;
  description?: string;
  foregroundColor: string;
  backgroundColor: string;
  size: number;
  errorCorrectionLevel: ErrorCorrectionLevel;
  folderId?: string;
  tagIds?: string[];
}

export interface QrCodeResponse {
  id: string;
  content: string;
  contentType: string;
  title: string;
  description: string | null;
  qrDataUrl: string;
  foregroundColor: string;
  backgroundColor: string;
  size: number;
  errorCorrectionLevel: string;
  isFavorite: boolean;
  folderId: string | null;
  createdAt: string;
  updatedAt: string;
  tags: TagResponse[];
  folder?: FolderResponse | null;
}

export interface TagResponse {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

export interface FolderResponse {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  children?: FolderResponse[];
  qrCodeCount?: number;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
}

export interface StatsResponse {
  totalCodes: number;
  favoriteCount: number;
  tagCount: number;
  folderCount: number;
  byContentType: Record<string, number>;
  recentActivity: { date: string; count: number }[];
}

export type QrContentType = 'text' | 'url' | 'email' | 'phone' | 'wifi' | 'vcard';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface WifiConfig {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface VCardData {
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  organization?: string;
  title?: string;
  url?: string;
  address?: string;
}

export interface QrFilterParams {
  search?: string;
  contentType?: QrContentType;
  isFavorite?: boolean;
  folderId?: string;
  tagId?: string;
  sortBy?: 'createdAt' | 'title' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
