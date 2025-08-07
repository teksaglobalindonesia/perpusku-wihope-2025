'use client'
interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPage,
  onPageChange
  
}: PaginationProps) => {
  const getPageNumber = () => {
    const page = [];
    const maxVisible = 1;
    if (totalPage <= 1) return [];

    page.push(1);

    if (currentPage > maxVisible + 2) {
      page.push('...');
    }

    const start = Math.max(2, currentPage - maxVisible);
    const end = Math.min(totalPage - 1, currentPage + maxVisible);

    for (let i = start; i <= end; i++) {
      page.push(i);
    }

    if (currentPage < totalPage - maxVisible - 1) {
      page.push('...');
    }

    if (totalPage > 1) {
      page.push(totalPage);
    }
    return page;
  };

  return (
    <div className="mt-6 flex items-center justify-center gap-2 font-vintage">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="rounded border border-beige-400 px-3 py-1 text-beige-800 transition-colors hover:bg-beige-200 disabled:opacity-40"
      >
        prev
      </button>

      {getPageNumber().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`h-8 w-8 rounded border ${
            page === currentPage
              ? 'border-vintage-sage bg-vintage-sage/20 text-vintage-sage'
              : 'border-beige-300 text-beige-700 hover:bg-beige-200'
          }`}
        >
          {page}
        </button>
      ))}

      <button onClick={() => onPageChange (Math.min(currentPage + 1, totalPage))} 
        disabled={currentPage === totalPage}
        className='rounded border border-beige-400 px-3 py-1 text-beige-800 transition-colors hover:bg-beige-200 disabled:opacity-40'
        >
        Next
      </button>
    </div>
  );
};
