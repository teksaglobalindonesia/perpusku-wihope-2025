'use client';
import { BookForm } from '@/components/customs/book/BookForm';
import { useRouter } from 'next/navigation';

export default function AddBookForm() {
  return (
    <div>
      <BookForm type="new" title="Tambah Buku" />
    </div>
  );
}
