"use client";

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: Props) {
    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
};

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <div className="flex items-center justify-center gap-1 md:gap-2 font-morrisroman text-sm md:text-xl mt-3 md:mt-4">
        <button onClick={handlePrev} disabled={currentPage === 1} className="px-2 md:px-3 py-1 border rounded text-xs md:text-base disabled:opacity-50">
            ←
        </button>
        {[...Array(totalPages)].map((_, index) => (
            <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            className={`px-2 md:px-3 py-1 border rounded text-xs md:text-base 
                ${currentPage === index + 1 ? "bg-green-400" : ""}`}
            >
            {index + 1}
            </button>
        ))}
        <button onClick={handleNext} disabled={currentPage === totalPages}className="px-2 md:px-3 py-1 border rounded text-xs md:text-base disabled:opacity-50">
            →
        </button>
        </div>
    );
}
