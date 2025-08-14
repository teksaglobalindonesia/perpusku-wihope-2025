'use client';
import { BackButton } from '@/components/customs/common/BackButton';
import { fetcher } from '@/lib/fetcher';
import { trim } from '@/lib/trim';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type FormCategoryPropType = {
  type: 'new' | 'edit';
  data?: any;
  documentId?: string;
};

export const CategoryForm = ({
  type,
  data,
  documentId = ''
}: FormCategoryPropType) => {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const handleNewCategory = async () => {
    if (!trim(category)) {
      return setError('Tolong lengkapi form');
    }

    const response = await fetcher({
      path: type == 'new' ? '/book-category/add' : '/book-category/edit',
      body: { documentId, data: { name: category } },
      method: type == 'new' ? 'POST' : 'PATCH',
      pagination: {
        isActive: false
      }
    });

    if (response.status != 200 && response.status != 201) {
      return setError('Gagal menambahkan kategori');
    }

    router.back();
  };

  useEffect(() => {
    setCategory(data?.name || '');
  }, []);

  return (
    <div className="mx-auto px-6 py-5 md:my-[50px] md:max-w-[80%]">
      <BackButton />
      <div
        className="mt-15 mx-auto
           w-full space-y-3 rounded-[20px] bg-neutral-silver p-[30px] sm:mt-auto md:w-[75%]"
      >
        <h1 className="py-2 text-2xl font-bold">Kategori Baru</h1>
        {error.trim() != '' && <p className="text-action-error">{error}</p>}
        <div>
          <label className="mb-1 block font-medium">Nama Kategori</label>
          <input
            type="text"
            className="w-full rounded-[5px] border-2 border-brand-primary px-3 py-1.5"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded bg-green-500 py-2 text-white transition hover:bg-green-600"
          onClick={handleNewCategory}
        >
          {type == 'new' ? 'SIMPAN KATEGORI' : 'SIMPAN PERUBAHAN'}
        </button>
      </div>
    </div>
  );
};
