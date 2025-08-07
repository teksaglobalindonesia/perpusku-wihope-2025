'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
  DialogClose,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '../ui/button';

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
  showSelectButton?: boolean;
};

export const CardGambar = ({ ...props }: CardGambarProps) => {
  return (
    <div className="grid gap-4 md:gap-6">
      {props.cardItems?.map((item, index) => (
        <div
          key={index}
          className="flex flex-col overflow-hidden rounded-xl border border-beige-300 bg-beige-100 shadow-md shadow-beige-200/30 transition-all hover:shadow-lg hover:shadow-beige-300/20 sm:flex-row"
        >
          {/* Foto dan Deskripsi */}
          <div className="flex flex-1 flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
            <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-md border border-beige-300 shadow-inner sm:h-32 sm:w-24">
              <Image
                src={item.imageSrc}
                alt="Book Cover"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="flex-1">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-vintage-brown sm:text-xl">
                  {item.title}
                </h2>
                <div className="flex flex-wrap flex-col gap-x-4 gap-y-1 text-sm sm:text-base">
                  <p className="text-beige-700">
                    <span className="font-medium text-beige-800">Genre:</span>{' '}
                    {item.genre}
                  </p>
                  <p className="text-beige-700">
                    <span className="font-medium text-beige-800">
                      Pengarang:
                    </span>{' '}
                    {item.author}
                  </p>
                </div>
              </div>

              {/* Tombol Aksi */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
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

                {item.buttons?.includes('edit') && (
                  <Link href="/book/editBook">
                    <button className="rounded-md border border-beige-400 bg-beige-200 px-4 py-1.5 text-sm text-beige-800 shadow-inner hover:bg-beige-300">
                      Edit
                    </button>
                  </Link>
                )}

                {item.buttons?.includes('delete') && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="rounded-md border border-vintage-terracotta bg-vintage-terracotta/90 px-4 py-1.5 text-sm font-medium text-beige-100 shadow-inner hover:bg-vintage-terracotta focus:outline-none focus:ring-2 focus:ring-vintage-terracotta/50">
                        Delete
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center font-vintage text-vintage-brown">
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
                          Konfirmasi penghapusan
                        </DialogTitle>
                        <DialogDescription>
                          Anda akan menghapus buku{' '}
                          <span className="font-medium text-vintage-brown">
                            {item.title}
                          </span>
                          . Tindakan tidak bisa di batalkan.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="sm:justify-end">
                        <DialogClose asChild>
                          <Button variant="secondary">Batal</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button
                            variant="destructive"
                            onClick={() => props.onDelete?.(index)}
                          >
                            {' '}
                            Hapus{' '}
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>

          {/* Status Stok */}
          <div
            className={`flex items-center justify-between border-t p-4 sm:justify-center sm:border-l sm:border-t-0 ${
              item.stock > 0
                ? 'border-vintage-sage bg-vintage-sage/20 text-vintage-sage'
                : 'border-vintage-terracotta bg-vintage-terracotta/10 text-vintage-terracotta'
            }`}
          >
            <span className="font-medium sm:hidden">Status:</span>
            <span>{item.stock > 0 ? `Stok: ${item.stock}` : 'HABIS'}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
