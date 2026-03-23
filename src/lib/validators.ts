import { z } from 'zod';
import {
  PASSWORD_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  DESCRIPTION_MAX_LENGTH,
  CONTENT_MAX_LENGTH,
  TAG_NAME_MAX_LENGTH,
  FOLDER_NAME_MAX_LENGTH,
} from './constants';

export const registerSchema = z.object({
  email: z
    .string()
    .email('Некоректна електронна адреса')
    .max(255, 'Електронна адреса занадто довга'),
  name: z
    .string()
    .min(2, 'Ім\'я повинно містити щонайменше 2 символи')
    .max(100, 'Ім\'я занадто довге'),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, `Пароль повинен містити щонайменше ${PASSWORD_MIN_LENGTH} символів`)
    .max(128, 'Пароль занадто довгий'),
});

export const loginSchema = z.object({
  email: z.string().email('Некоректна електронна адреса'),
  password: z.string().min(1, 'Пароль обов\'язковий'),
});

export const qrCodeCreateSchema = z.object({
  content: z
    .string()
    .min(1, 'Вміст не може бути порожнім')
    .max(CONTENT_MAX_LENGTH, `Вміст занадто довгий (максимум ${CONTENT_MAX_LENGTH} символів)`),
  contentType: z.enum(['text', 'url', 'email', 'phone', 'wifi', 'vcard']).default('text'),
  title: z
    .string()
    .min(1, 'Назва обов\'язкова')
    .max(TITLE_MAX_LENGTH, `Назва занадто довга (максимум ${TITLE_MAX_LENGTH} символів)`),
  description: z
    .string()
    .max(DESCRIPTION_MAX_LENGTH, `Опис занадто довгий (максимум ${DESCRIPTION_MAX_LENGTH} символів)`)
    .optional()
    .nullable(),
  foregroundColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Некоректний формат кольору')
    .default('#000000'),
  backgroundColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Некоректний формат кольору')
    .default('#FFFFFF'),
  size: z.number().int().min(100).max(1000).default(300),
  errorCorrectionLevel: z.enum(['L', 'M', 'Q', 'H']).default('M'),
  folderId: z.string().optional().nullable(),
  tagIds: z.array(z.string()).optional().default([]),
});

export const qrCodeUpdateSchema = z.object({
  title: z
    .string()
    .min(1, 'Назва обов\'язкова')
    .max(TITLE_MAX_LENGTH)
    .optional(),
  description: z
    .string()
    .max(DESCRIPTION_MAX_LENGTH)
    .optional()
    .nullable(),
  isFavorite: z.boolean().optional(),
  folderId: z.string().optional().nullable(),
  tagIds: z.array(z.string()).optional(),
  foregroundColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .optional(),
  backgroundColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .optional(),
  size: z.number().int().min(100).max(1000).optional(),
  errorCorrectionLevel: z.enum(['L', 'M', 'Q', 'H']).optional(),
});

export const tagCreateSchema = z.object({
  name: z
    .string()
    .min(1, 'Назва тегу обов\'язкова')
    .max(TAG_NAME_MAX_LENGTH, `Назва тегу занадто довга (максимум ${TAG_NAME_MAX_LENGTH} символів)`),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Некоректний формат кольору')
    .default('#6366f1'),
});

export const tagUpdateSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(TAG_NAME_MAX_LENGTH)
    .optional(),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .optional(),
});

export const folderCreateSchema = z.object({
  name: z
    .string()
    .min(1, 'Назва папки обов\'язкова')
    .max(FOLDER_NAME_MAX_LENGTH, `Назва папки занадто довга (максимум ${FOLDER_NAME_MAX_LENGTH} символів)`),
  parentId: z.string().optional().nullable(),
});

export const folderUpdateSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(FOLDER_NAME_MAX_LENGTH)
    .optional(),
  parentId: z.string().optional().nullable(),
});

export const qrGenerateSchema = z.object({
  content: z
    .string()
    .min(1, 'Вміст не може бути порожнім')
    .max(CONTENT_MAX_LENGTH),
  contentType: z.enum(['text', 'url', 'email', 'phone', 'wifi', 'vcard']).default('text'),
  foregroundColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .default('#000000'),
  backgroundColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .default('#FFFFFF'),
  size: z.number().int().min(100).max(1000).default(300),
  errorCorrectionLevel: z.enum(['L', 'M', 'Q', 'H']).default('M'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type QrCodeCreateInput = z.infer<typeof qrCodeCreateSchema>;
export type QrCodeUpdateInput = z.infer<typeof qrCodeUpdateSchema>;
export type TagCreateInput = z.infer<typeof tagCreateSchema>;
export type TagUpdateInput = z.infer<typeof tagUpdateSchema>;
export type FolderCreateInput = z.infer<typeof folderCreateSchema>;
export type FolderUpdateInput = z.infer<typeof folderUpdateSchema>;
export type QrGenerateInput = z.infer<typeof qrGenerateSchema>;
