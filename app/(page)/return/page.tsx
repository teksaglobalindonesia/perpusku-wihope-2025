import { ReturnList } from '@/components/customs/return/ReturnList';
import { Header } from '@/components/customs/layouts/header';
import { fetcher } from '@/lib/fetcher';

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
