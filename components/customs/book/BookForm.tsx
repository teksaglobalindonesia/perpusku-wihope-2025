'use client';
import { BASE_URL } from '@/lib/constant';
import { useState, useEffect } from 'react';
import { BackButton } from '@/components/customs/common/BackButton';
import Image from 'next/image';
import { trim } from '@/lib/trim';
import { writer } from 'repl';
import { fetcher } from '@/lib/fetcher';

type BookFormTypeProps = {
  title: string;
  type: 'edit' | 'new';
  data?: any;
  categories: any;
};

export const BookForm = ({
  title,
  type,
  data,
  categories
}: BookFormTypeProps) => {
  const [bookTitle, setBookTitle] = useState<string>('');
  const [bookWriter, setBookWriter] = useState<string>('');
  const [bookPublisher, setBookPublisher] = useState<string>('');
  const [bookPublishedYear, setBookPublishedYear] = useState<string>('');
  const [bookCategoris, setBookCategories] = useState<any>([]);
  const [bookStock, setBookStock] = useState<string>('0');
  const [documentId, setDocumentId] = useState<string>('');
  const [bookCover, setBookCover] = useState<{
    url: string;
    file: File | undefined;
  }>({
    file: undefined,
    url: ''
  });
  const [error, setError] = useState<string>('');

  const handleInsertAndUpdateBookData = async () => {
    if (
      !trim([
        bookTitle,
        bookWriter,
        bookPublishedYear,
        bookPublisher,
        documentId
      ])
    ) {
      setError('Tolong lengkapi form');
      return;
    }
    if (Number(bookStock) == 0) {
      setError('Stock tidak boleh kosong');
      return;
    }
    if (!bookCover?.file && !bookCover.url) {
      setError('Pilih cover buku');
      return;
    }

    const formData = new FormData();

    if (bookCover.file) {
      formData.append('files.cover', bookCover.file);
    }
    formData.append('documentId', documentId);

    formData.append(
      'data',
      JSON.stringify({
        title: bookTitle,
        writer: bookWriter,
        publisher: bookPublisher,
        published_year: bookPublishedYear,
        stock: Number(bookStock),
        categories: bookCategoris?.map((data: any) => data.documentId)
      })
    );

    const response = await fetcher({
      path: type == 'new' ? '/book/add' : '/book/edit',
      pagination: { isActive: false },
      method: type == 'new' ? 'POST' : 'PATCH',
      body: formData,
      withFile: true
    });

    if (response.status !== 200 && response.status !== 201) {
      return setError('Gagal menambahkan buku');
    }

    window.location.reload();
  };

  const setCategory = (categoryData: any) => {
    const isExist = bookCategoris?.some(
      (data: any) => data?.documentId === categoryData?.documentId
    );
    if (isExist) {
      setBookCategories((prev: any) =>
        prev.filter(
          (data: any) => data?.documentId !== categoryData?.documentId
        )
      );
    } else {
      setBookCategories((prev: any) => [...prev, categoryData]);
    }
  };

  useEffect(() => {
    if (type === 'edit' && typeof data !== 'undefined') {
      setBookTitle(data?.data?.title || '');
      setBookWriter(data?.data?.writer || '');
      setBookPublisher(data?.data?.publisher || '');
      setBookPublishedYear(data?.data?.published_year || '');
      setBookCategories(data?.data?.categories || []);
      setBookStock(data?.data?.stock?.toString() || '');
      setBookCover((prev) => ({ ...prev, url: data?.data?.cover?.url || '' }));
      setDocumentId(data?.data?.documentId);
    }
  }, [data]);
  return (
    <div className="mx-auto px-6 py-5 md:my-[50px] md:max-w-[80%]">
      <BackButton />
      <div className="mt-15 mx-auto w-full space-y-3 rounded-[20px] bg-neutral-silver p-[30px] sm:mt-auto md:w-[75%] ">
        <h1 className="py-2 text-2xl font-bold">{title}</h1>
        {error && <p className="text-red-500">*{error}</p>}
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
            {/* {bookCategoris?.length > 0 &&
              bookCategoris.map((data: any, i: number) => (
                <div key={i} className="flex w-max gap-[2px]">
                  <input
                    type="checkbox"
                    checked
                    onChange={(e) => setBookCategories((e) => ({ ...e }))}
                  />
                  <label htmlFor="">{data?.name}</label>
                </div>
              ))} */}

            {categories?.map((data: any, i: number) => (
              <div key={i} className="flex gap-2">
                <input
                  type="checkbox"
                  checked={bookCategoris?.some(
                    (category: any) => category?.documentId === data?.documentId
                  )}
                  onChange={() => setCategory(data)}
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
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                setBookCover((prev) => ({
                  ...prev,
                  file: e.target.files?.[0],
                  url: e.target.files?.[0]
                    ? URL.createObjectURL(e.target.files?.[0])
                    : prev.url
                }))
              }
            />
          </label>

          <div className=" mt-2">
            {bookCover?.url && (
              <Image
                src={
                  type == 'edit'
                    ? `${BASE_URL}${bookCover.url}`
                    : bookCover?.url || ''
                }
                alt=""
                width={300}
                height={300}
                className="w-[300px] rounded-[10px] object-cover"
              />
            )}
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded bg-green-500 py-2 text-white transition hover:bg-green-600"
          onClick={handleInsertAndUpdateBookData}
        >
          {type == 'new' ? 'SIMPAN BUKU' : 'SIMPAN PERUBAHAN'}
        </button>
      </div>
    </div>
  );
};
