'use client';

import { useToastContext } from '@/context/ToastContext';

export function useToast() {
  const { addToast } = useToastContext();

  const success = (message: string) => addToast(message, 'success');
  const error = (message: string) => addToast(message, 'error');
  const info = (message: string) => addToast(message, 'info');
  const warning = (message: string) => addToast(message, 'warning');

  return { success, error, info, warning };
}
