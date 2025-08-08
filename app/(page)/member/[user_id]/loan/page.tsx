import { BackButton } from '@/components/customs/common/BackButton';
import { LoanList } from '@/components/customs/loan/LoanList';
import { Header } from '@/components/customs/layouts/header';
import { fetcher } from '@/lib/fetcher';

export default async function UserBorrowedBooksPage({
  params
}: {
  params: any;
}) {
  const response = await fetcher({
    path: `/loan/list`,
    query: `id_member=${params?.user_id}`
  });

  // console.log(response.data?.data);

  return (
    <div>
      <Header title="yaudah" />
      <BackButton />
      <div className="px-[50px]">
        <LoanList
          layout={{
            title: `Daftar Peminjaman ${response.data?.data[0]?.member?.name}`
          }}
          today={false}
          data={response?.data}
        />
      </div>
    </div>
  );
}
