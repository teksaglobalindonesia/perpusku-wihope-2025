import { Dispatch, SetStateAction } from 'react';

export type ExternalPaginationControllPropType = {
  page: number;
  totalPages: number;
  onChangePage: Dispatch<SetStateAction<number>>;
};

export const ExternalPaginationControll = ({
  page = 1,
  totalPages = 1,
  onChangePage
}: ExternalPaginationControllPropType) => {
  return (
    <div className="mt-4 flex justify-center gap-4 py-2 text-white">
      <button
        onClick={() =>
          onChangePage((prev: number) => (prev > 1 ? prev - 1 : 1))
        }
        disabled={page === 1}
        className="rounded bg-gray-600 px-3 py-1 disabled:opacity-50"
      >
        Prev
      </button>
      <span className="text-black">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() =>
          onChangePage((prev: number) =>
            prev >= totalPages ? totalPages : prev + 1
          )
        }
        disabled={page === totalPages}
        className="rounded bg-gray-600 px-3 py-1 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
