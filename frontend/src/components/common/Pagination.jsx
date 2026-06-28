import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-border-subtle bg-background">
      <p className="text-sm text-outline">
        Halaman <span className="font-bold text-text-main">{currentPage}</span> dari <span className="font-bold text-text-main">{totalPages}</span>
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded border border-outline text-text-main hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex gap-1">
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            const isActive = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-8 h-8 rounded text-sm font-bold transition-all ${
                  isActive ? 'bg-primary text-white shadow-sm' : 'border border-outline text-text-main hover:border-primary hover:text-primary'
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded border border-outline text-text-main hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
