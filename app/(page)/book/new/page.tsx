import { BookForm } from '@/components/customs/book/BookForm';
import { fetcher } from '@/lib/fetcher';

export default async function AddBookForm() {
  const bookCategories = await fetcher({
    path: '/book-category/list',
    pagination: {
      isActive: false
    }
  });

  return (
    <div>
      <BookForm
        type="new"
        title="Tambah Buku"
        categories={bookCategories.data?.data}
      />
    </div>
  );
}
