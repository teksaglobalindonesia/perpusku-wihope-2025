import { useState, useEffect, useMemo } from 'react';

export type UsePaginationPropsType = {
  data: any[];
  pageSize: number;
  page?: number;
};

export const usePagination = ({
  data = [],
  pageSize = 10,
  page = 1
}: UsePaginationPropsType) => {
  const [internalPage, setInternalPage] = useState<number>(page || 1);
  const totalPage = Math.ceil(data.length / pageSize);

  const isControlled = page !== undefined;
  const currentPage = isControlled ? page : internalPage;

  const paginatedData = useMemo(() => {
    const paginated = data.slice((page - 1) * pageSize, pageSize * page);
    return paginated;
  }, [data, pageSize, page]);

  const goToNextPage = () => {
    if (!isControlled) {
      setInternalPage((prev) => Math.min(prev + 1, totalPage));
    }
  };
  const goToPrevPage = () => {
    if (!isControlled) {
      setInternalPage((prev) => Math.max(prev - 1, totalPage));
    }
  };

  return {
    paginatedData,
    currentPage,
    totalPage,
    setCurrentPage: isControlled ? undefined : setInternalPage,
    goToNextPage,
    goToPrevPage
  };
};

// chat gpt
// export const usePagination = ({
//   data = [],
//   pageSize = 10,
//   page // optional
// }: UsePaginationPropsType) => {
//   const [internalPage, setInternalPage] = useState<number>(1);

//   const isControlled = page !== undefined;
//   const currentPage = isControlled ? page : internalPage;

//   const totalPage = Math.ceil(data.length / pageSize);

//   const paginatedData = useMemo(() => {
//     const start = (currentPage - 1) * pageSize;
//     const end = start + pageSize;
//     return data.slice(start, end);
//   }, [data, pageSize, currentPage]);

//   const goToNextPage = () => {
//     if (!isControlled) {
//       setInternalPage((prev) => Math.min(prev + 1, totalPage));
//     }
//   };

//   const goToPrevPage = () => {
//     if (!isControlled) {
//       setInternalPage((prev) => Math.max(prev - 1, 1));
//     }
//   };

//   return {
//     paginatedData,
//     currentPage,
//     totalPage,
//     setCurrentPage: isControlled ? undefined : setInternalPage,
//     goToNextPage,
//     goToPrevPage
//   };
// };
