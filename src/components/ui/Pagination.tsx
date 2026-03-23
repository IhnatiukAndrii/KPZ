'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];
  const maxVisible = 5;

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    pages.push(totalPages);
  }

  return (
    <nav className="flex items-center justify-center gap-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-700/50 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        ←
      </button>
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`
            rounded-lg px-3 py-2 text-sm transition-colors
            ${page === currentPage
              ? 'bg-indigo-600 text-white'
              : page === '...'
                ? 'text-slate-500 cursor-default'
                : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
            }
          `}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-700/50 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        →
      </button>
    </nav>
  );
}
