'use client';
import React from 'react';
import { SetDeleteDialog } from '@/types/DeleteDialog';
import { UseBodyOverflow } from '@/hooks/custom/useBodyOverflow';
import { useEffect, SetStateAction, Dispatch } from 'react';
import { fetcher } from '@/lib/fetcher';

type DialogPropsType = {
  deleteDialogData: SetDeleteDialog;
  title: string;
  message: string;
  type: 'book' | 'member';
  setDeleteDialog: Dispatch<SetStateAction<SetDeleteDialog>>;
};

export const DeleteDialog = ({
  deleteDialogData,
  title,
  message,
  type,
  setDeleteDialog
}: DialogPropsType) => {
  UseBodyOverflow(deleteDialogData.isShow);

  const handleDeleteData = async () => {
    setDeleteDialog((prev) => ({
      ...prev,
      isDelete: true,
      isShow: false
    }));

    const response = await fetcher({
      path: type == 'book' ? '/book/delete' : '/member/delete',
      method: 'POST',
      body: { documentId: deleteDialogData.identifier },
      pagination: {
        isActive: false
      }
    });

    window.location.reload();
  };

  return (
    deleteDialogData?.isShow && (
      <div className="fixed inset-0 top-0 z-50 flex items-center justify-center bg-black/50">
        <div className="animate-fade-in w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <p className="mt-2 text-sm text-gray-600">{message?.toUpperCase()}</p>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() =>
                setDeleteDialog((prev: SetDeleteDialog) => ({
                  ...prev,
                  isShow: false
                }))
              }
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
            >
              Batal
            </button>
            <button
              onClick={handleDeleteData}
              className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    )
  );
};
