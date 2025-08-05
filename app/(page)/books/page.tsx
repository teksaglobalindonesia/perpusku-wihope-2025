import { BookList } from '@/components/customs/dev/book/BookList';
import { Header } from '@/components/customs/layouts/header';
import { fetcher } from '@/lib/dev/fetcher';

export default async function BooksPage() {
  const booksOutOfStock = await fetcher({
    path: '/book/list',
    pagination: {
      pageSize: 10
    }
  });

  return (
    <div>
      <Header title="" />
      <div>
        <BookList
          type="all"
          data={booksOutOfStock?.data}
          layout={{ title: 'Buku' }}
        />
      </div>
    </div>
  );
}
