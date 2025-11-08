import { MemberList } from '@/components/customs/member/MemberList';
import { Header } from '@/components/customs/layouts/header';
import { fetcher } from '@/lib/fetcher';

export default async function Member() {
  const pageSize = 10;
  const memberDatas = await fetcher({
    path: '/member/list',
    pagination: {
      pageSize
    }
  });

  return (
    <div>
      <Header title="" />
      <div>
        <MemberList data={memberDatas.data} pageSize={pageSize} />
      </div>
    </div>
  );
}
