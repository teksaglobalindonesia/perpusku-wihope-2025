import { useState, useMemo, useCallback } from 'react';

export const usePagination = <T>(
  data: T[], // Gunakan generic type
  itemsPerPage: number // Gunakan nama yang konsisten
) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Hitung total halaman dengan benar
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Optimasi dengan useMemo
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  // Optimasi fungsi dengan useCallback
  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const goToPrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  // const goToPage = useCallback(
  //   (page: number) => {
  //     const pageNumber = Math.max(1, Math.min(page, totalPages));
  //     setCurrentPage(pageNumber);
  //   },
  //   [totalPages]
  // );

  return {
    currentPage,
    totalPages,
    paginatedData,
    goToNextPage,
    goToPrevPage,
    // goToPage,
    setCurrentPage
  };
};
