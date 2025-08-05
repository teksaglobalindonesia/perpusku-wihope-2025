import { LoanList } from '@/components/customs/dev/loan/LoanList';
import { ReturnList } from '@/components/customs/dev/return/ReturnList';
import { Header } from '@/components/customs/layouts/header';
import { fetcher } from '@/lib/dev/fetcher';

export default async function Return() {
  const pageSize = 10;
  const loanDatas = await fetcher({
    path: '/return/list',
    pagination: {
      pageSize
    }
  });

  return (
    <div>
      <Header title="" />
      <div>
        <ReturnList
          data={loanDatas.data}
          layout={{ title: 'Pengembalian' }}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
}
