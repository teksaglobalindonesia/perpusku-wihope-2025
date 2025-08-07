"use client";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center space-x-4 my-8">
      <button
        className="px-4 py-2 border bg-neutral-sbrown rounded-md text-neutral-white hover:opacity-70 cursor-pointer"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      
      <span className="px-4 py-2 bg-neutral-100 rounded-md font-semibold text-neutral-sbrown">
        {currentPage}
      </span>
      
      <button
        className="px-4 py-2 border bg-neutral-sbrown rounded-md text-neutral-white hover:opacity-70 cursor-pointer"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}