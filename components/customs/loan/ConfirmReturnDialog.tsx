import { fetcher } from '@/lib/fetcher';
import { format } from 'date-fns';
import React from 'react';

type ConfirmReturnDialogPropType = {
  isShow: boolean;
  identifier: string;
  setIsShow: React.Dispatch<
    React.SetStateAction<{
      isShow: boolean;
      identifier: string;
    }>
  >;
};

export const ConfirmReturnDialog = ({
  isShow,
  identifier,
  setIsShow
}: ConfirmReturnDialogPropType) => {
  //
  const handleReturnBook = async () => {
    const response = await fetcher({
      path: '/return/add',
      method: 'POST',
      body: {
        data: {
          loan: identifier,
          actual_return_date: format(new Date(), 'yyyy-MM-dd')
        }
      }
    });

    window.location.reload();

    setIsShow((prev) => ({ ...prev, isShow: false }));
  };

  return (
    isShow && (
      <div className="fixed inset-0 top-0 z-50 flex items-center justify-center bg-black/50">
        <div className="animate-fade-in w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
          {/* <h2 className="text-lg font-semibold text-gray-800">
          
        </h2> */}
          <p className="mt-2 text-sm text-gray-600">
            Apakah ada yakin buku ini sudah Dikembalikan?
          </p>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={handleReturnBook}
              className="px-4 py-2 text-sm font-medium text-neutral-gray"
            >
              Iya
            </button>
            <button
              onClick={() => setIsShow((prev) => ({ ...prev, isShow: false }))}
              className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              Tidak
            </button>
          </div>
        </div>
      </div>
    )
  );
};
