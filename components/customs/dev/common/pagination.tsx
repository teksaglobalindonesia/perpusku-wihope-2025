import { Dispatch, SetStateAction } from 'react';

export type PaginationControllPropType = {
  page: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;

  //
  data?: any[];
};

export const PaginationControll = ({
  page = 1,
  totalPages = 1,
  onPrevPage,
  onNextPage
}: PaginationControllPropType) => {
  return (
    <div className="mt-4 flex justify-center gap-4 text-white">
      <button
        onClick={onPrevPage}
        disabled={page === 1}
        className="rounded bg-gray-600 px-3 py-1 disabled:opacity-50"
      >
        Prev
      </button>
      <span className="text-black">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={onNextPage}
        disabled={page === totalPages}
        className="rounded bg-gray-600 px-3 py-1 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
