import { BookForm } from '@/components/customs/book/BookForm';
import { fetcher } from '@/lib/fetcher';

export default async function AddBookForm({ params }: { params: any }) {
  const bookId = decodeURIComponent(params?.book_id);

  const bookData = await fetcher({
    path: `/surya-books/${bookId}`,
    query: 'populate=cover&populate=categories'
  });

  return (
    <div>
      <BookForm type="edit" title="Edit Buku" data={bookData.data} />
    </div>
  );
}
