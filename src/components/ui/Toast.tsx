'use client';

import { useToastContext } from '@/context/ToastContext';

const typeStyles: Record<string, string> = {
  success: 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300',
  error: 'bg-red-500/10 border-red-500/50 text-red-300',
  info: 'bg-blue-500/10 border-blue-500/50 text-blue-300',
  warning: 'bg-amber-500/10 border-amber-500/50 text-amber-300',
};

const typeIcons: Record<string, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
  warning: '⚠',
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToastContext();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg
            backdrop-blur-sm animate-in slide-in-from-right duration-300
            ${typeStyles[toast.type]}
          `}
        >
          <span className="text-lg">{typeIcons[toast.type]}</span>
          <p className="flex-1 text-sm">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-current opacity-60 hover:opacity-100 transition-opacity"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
