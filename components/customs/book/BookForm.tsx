'use client';
import { BASE_URL } from '@/lib/constant';
import { useState, useEffect } from 'react';
import { BackButton } from '@/components/customs/common/BackButton';
import Image from 'next/image';

type BookFormTypeProps = {
  title: string;
  type: 'edit' | 'new';
  data?: any;
};

export const BookForm = ({ title, type, data }: BookFormTypeProps) => {
  const [bookTitle, setBookTitle] = useState<string>('');
  const [bookWriter, setBookWriter] = useState<string>('');
  const [bookPublisher, setBookPublisher] = useState<string>('');
  const [bookPublishedYear, setBookPublishedYear] = useState<string>('');
  const [bookCategoris, setBookCategories] = useState<[]>([]);
  const [bookStock, setBookStock] = useState<string>('0');
  const [bookCover, setBookCover] = useState<string>('');

  useEffect(() => {
    if (type === 'edit' && typeof data !== 'undefined') {
      setBookTitle(data?.data?.title || '');
      setBookWriter(data?.data?.writer || '');
      setBookPublisher(data?.data?.publisher || '');
      setBookPublishedYear(data?.data?.published_year || '');
      setBookCategories(data?.data?.categories || []);
      setBookStock(data?.data?.stock?.toString() || '');
      setBookCover(data?.data?.cover?.url || '');
    }
  }, [data]);
  return (
    <div className="mx-auto my-[50px] max-w-[80%] px-6 py-5">
      <BackButton />
      <div className="mx-auto w-[75%] space-y-3 rounded-[20px] bg-neutral-silver p-[30px] ">
        <h1 className="py-2 text-2xl font-bold">{title}</h1>
        <div>
          <label className="mb-1 block font-medium">Judul</label>
          <input
            type="text"
            className="w-full rounded-[5px] border-2 border-brand-primary px-3  py-1.5"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Penulis</label>
          <input
            type="text"
            className="w-full rounded-[5px] border-2 border-brand-primary px-3  py-1.5"
            value={bookWriter}
            onChange={(e) => setBookWriter(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Penerbit</label>
          <input
            type="text"
            className="w-full rounded-[5px] border-2 border-brand-primary px-3  py-1.5"
            value={bookPublisher}
            onChange={(e) => setBookPublisher(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Tahun Terbit</label>
          <input
            type="text"
            className="w-full rounded-[5px] border-2 border-brand-primary px-3  py-1.5"
            value={bookPublishedYear}
            onChange={(e) => setBookPublishedYear(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Kategori</label>
          <button
            type="button"
            className="mb-2 rounded bg-brand-primary px-2 py-1 text-sm font-semibold text-white"
          >
            TAMBAH KATEGORI
          </button>
          <div className="ml-1 space-y-1">
            {bookCategoris?.length > 0 &&
              bookCategoris.map((data: any, i: number) => (
                <div key={i} className="flex w-max gap-[2px]">
                  <input
                    type="checkbox"
                    checked
                    onChange={(e) => setBookCategories((e) => ({ ...e }))}
                  />
                  <label htmlFor="">{data?.name}</label>
                </div>
              ))}
          </div>
        </div>

        <div>
          <label className="mb-1 block font-medium">Stok</label>
          <input
            type="number"
            className="w-full rounded-[5px] border-2 border-brand-primary px-3  py-1.5"
            value={bookStock}
            onChange={(e) => setBookStock(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Cover</label>
          <label className="cursor-pointer rounded bg-brand-primary px-3 py-1 font-medium text-white transition hover:bg-yellow-500">
            Pilih Gambar
            <input type="file" accept="image/*" className="hidden" />
          </label>

          <div className=" mt-2">
            <Image
              src={`${BASE_URL}${bookCover}`}
              alt=""
              width={300}
              height={300}
              className="w-[300px] rounded-[10px] object-cover"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded bg-green-500 py-2 text-white transition hover:bg-green-600"
        >
          SIMPAN BUKU
        </button>
      </div>
    </div>
  );
};
