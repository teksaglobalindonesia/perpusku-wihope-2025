import { BookList } from '@/components/customs/dev/book/BookList';
import { InternalPaginationControll } from '@/components/customs/dev/common/InternalPaginationControll';
import { LoanList } from '@/components/customs/dev/loan/LoanList';
import { ReturnList } from '@/components/customs/dev/return/ReturnList';
import { Header } from '@/components/customs/layouts/header';
import { fetcher } from '@/lib/dev/fetcher';
import { format } from 'date-fns';

export default async function Page() {
  const booksOutOfStock = await fetcher({
    path: '/book/list',
    query: 'filters[stock][$eq]=0'
  });

  const today = format(new Date(), 'yyyy-MM-dd');

  const loanListData = await fetcher({
    path: '/loan/list?status=loaned'
    // query: `filters[loan_date][$eq]=${new Date()}`
  });

  const returnListData = await fetcher({
    path: '/loan/list?status=loaned'
    // query: `filters[return_date][$eq]=${new Date()}`
  });

  return (
    <div>
      <Header title="" />
      <div>
        <BookList
          type="out of stock"
          data={booksOutOfStock?.data}
          layout={{ title: 'Buku Stok Habis' }}
        />
        <LoanList
          today={true}
          data={loanListData?.data}
          layout={{
            title: 'Peminjaman Hari ini',
            searchBar: true
          }}
        />
        <ReturnList
          today={true}
          data={returnListData?.data}
          layout={{
            title: 'Pengembalian Hari ini',
            searchBar: true
          }}
        />
      </div>
    </div>
  );
}
