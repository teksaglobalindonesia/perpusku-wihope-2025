import Link from 'next/link';
import { useState } from 'react';
import { DialogClose } from '../ui/dialog';

export type MCardProps = {
  cardItems?: Array<{
    name?: string;
    UID?: number;
    email?: string;
    buttons?: Array<'peminjaman' | 'edit' | 'delete'>;
  }>;
  onEdit?: (index: number) => void;
  onDelete?: (index: number) => void;
  onPeminjaman?: (index: number) => void;
  showSelectButton?: boolean;
};

export const MembersCard = ({ ...props }: MCardProps) => {
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleDeleteClick = (index: number) => {
    setDeleteIndex(index);
  };

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      props.onDelete?.(deleteIndex);
      setDeleteIndex(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* POP UP DELETE  */}
      {deleteIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg border border-beige-400 bg-beige-50 p-6 shadow-xl shadow-beige-800/10">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-vintage-terracotta/10 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-vintage-terracotta"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="font-vintage text-xl font-semibold text-vintage-brown">
                Konfirmasi Penghapusan
              </h3>
            </div>
            <p className="mb-6 font-roboto text-beige-800">
              Anda akan menghapus{' '}
              <span className="font-medium text-vintage-brown">
                {props.cardItems?.[deleteIndex]?.name}
              </span>
              . Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteIndex(null)}
                className="rounded-md border border-beige-300 bg-beige-100 px-4 py-2 font-vintage text-sm font-medium text-beige-800 shadow-sm transition-colors hover:bg-beige-200 focus:outline-none focus:ring-2 focus:ring-vintage-sage/50"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="rounded-md border border-vintage-terracotta bg-vintage-terracotta px-4 py-2 font-vintage text-sm font-medium text-beige-50 shadow-sm transition-colors hover:bg-vintage-terracotta/90 focus:outline-none focus:ring-2 focus:ring-vintage-terracotta/50"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
      {props.cardItems?.map((items, index) => (
        <div
          key={index}
          className="rounded-lg border border-beige-300 bg-beige-100 p-4 transition-all duration-300 hover:shadow-lg hover:shadow-vintage-sage/50"
        >
          <div className="flex flex-col gap-2 font-vintage">
            <h2 className="text-xl font-semibold text-vintage-brown">
              {items.name}
            </h2>

            <div className="flex flex-col gap-1 text-beige-800">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-vintage-terracotta"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">UID: {items.UID}</span>
              </div>

              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-vintage-terracotta"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-sm">{items.email}</span>
              </div>
            </div>

            {props.showSelectButton && (
              <DialogClose asChild>
                <button
                  onClick={() => props.onEdit?.(index)}
                  className="rounded-md border border-vintage-sage bg-vintage-sage/90 px-4 py-1.5 text-sm text-beige-100 shadow-inner hover:bg-vintage-sage"
                >
                  Pilih
                </button>
              </DialogClose>
            )}
            {items.buttons && items.buttons.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2 border-t border-beige-300 pt-3">
                {items.buttons.includes('peminjaman') && (
                  <Link
                    href="/members/PJMember"
                    className="min-w-[100px] flex-1 lg:flex-none"
                  >
                    <button
                      onClick={() => props.onPeminjaman?.(index)}
                      className="flex w-full items-center justify-center gap-1 rounded-md border border-vintage-sage bg-vintage-sage/90 px-3 py-1.5 text-sm text-beige-100 shadow-inner transition-colors hover:bg-vintage-sage lg:w-auto"
                    >
                      {/* Icon dan text tetap sama */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                      </svg>
                      <span className="whitespace-nowrap">Peminjaman</span>
                    </button>
                  </Link>
                )}

                {items.buttons.includes('edit') && (
                  <Link
                    href="/members/editMember"
                  >
                    <button
                      onClick={() => props.onEdit?.(index)}
                      className="min-w-[100px] flex-1 lg:flex-none flex w-full items-center justify-center gap-1 rounded-md border border-beige-400 bg-beige-200 py-1.5 text-sm text-beige-800 shadow-inner transition-colors hover:bg-beige-300 lg:w-auto"
                    >
                      {/* Icon dan text tetap sama */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      <span className="whitespace-nowrap">Edit</span>
                    </button>
                  </Link>
                )}

                {items.buttons.includes('delete') && (
                  <div className="min-w-[100px] flex-1 lg:flex-none">
                    <button
                      onClick={() => handleDeleteClick(index)}
                      className="flex w-full items-center justify-center gap-1 rounded-md border border-vintage-terracotta bg-vintage-terracotta/90 px-3 py-1.5 text-sm text-beige-100 shadow-inner transition-colors hover:bg-vintage-terracotta lg:w-auto"
                    >
                      {/* Icon dan text tetap sama */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="whitespace-nowrap">Delete</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
