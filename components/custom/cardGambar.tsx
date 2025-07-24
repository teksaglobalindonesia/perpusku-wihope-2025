import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export type CardGambarProps = {
  cardItems?: Array<{
    imageSrc: string;
    title: string;
    genre: string;
    author: string;
    stock: number;
    buttons?: Array<'edit' | 'delete'>;
  }>;
  onEdit?: (index: number) => void;
  onDelete?: (index: number) => void;
};

export const CardGambar = ({ ...props }: CardGambarProps) => {
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
              Anda akan menghapus buku{' '}
              <span className="font-medium text-vintage-brown">
                {props.cardItems?.[deleteIndex]?.title}
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
      {props.cardItems?.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-xl border border-beige-300 bg-beige-100 px-6 py-4 shadow-md shadow-beige-200/30 transition-all hover:shadow-lg hover:shadow-beige-300/20"
        >
          {/* Foto dan Deskripsi */}
          <div className="flex items-center gap-6">
            <div className="relative h-32 w-24 overflow-hidden rounded-md border border-beige-300 shadow-inner">
              <Image
                src={item.imageSrc}
                alt="Book Cover"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="flex flex-col gap-2 font-vintage">
              <h2 className="text-xl font-semibold text-vintage-brown">
                {item.title}
              </h2>
              <p className="text-beige-700">
                <span className="font-medium text-beige-800">Genre:</span>{' '}
                {item.genre}
              </p>
              <p className="text-beige-700">
                <span className="font-medium text-beige-800">Pengarang:</span>{' '}
                {item.author}
              </p>

              {/* Tombol Edit dan Delete */}
              {item.buttons && item.buttons.length > 0 && (
                <div className="mt-2 flex gap-3">
                  <Link href="/book/editBook">
                    {item.buttons.includes('edit') && (
                      <button
                        onClick={() => props.onEdit?.(index)}
                        className="rounded-md border border-beige-400 bg-beige-200 px-4 py-1.5 text-sm text-beige-800 shadow-inner hover:bg-beige-300"
                      >
                        Edit
                      </button>
                    )}
                  </Link>
                  {item.buttons.includes('delete') && (
                    <button
                      onClick={() => handleDeleteClick(index)}
                      className="rounded-md border border-vintage-terracotta bg-vintage-terracotta/90 px-4 py-1.5 text-sm text-beige-100 shadow-inner hover:bg-vintage-terracotta"
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Status Stok */}
          <div
            className={`rounded-md px-4 py-2 font-vintage font-medium ${
              item.stock > 0
                ? 'border border-vintage-sage bg-vintage-sage/20 text-vintage-sage'
                : 'border border-vintage-terracotta bg-vintage-terracotta/10 text-vintage-terracotta'
            }`}
          >
            {item.stock > 0 ? `Stok: ${item.stock}` : 'HABIS'}
          </div>
        </div>
      ))}
    </div>
  );
};
