import { LoanList } from '@/components/customs/dev/loan/LoanList';
import { Header } from '@/components/customs/layouts/header';
import { fetcher } from '@/lib/dev/fetcher';

export default async function Return() {
  const pageSize = 10;
  const loanDatas = await fetcher({
    path: '/loan/list',
    pagination: {
      pageSize
    }
  });

  return (
    <div>
      <Header title="" />
      <div>
        <LoanList
          data={loanDatas.data}
          layout={{ title: 'Peminjaman' }}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
}
