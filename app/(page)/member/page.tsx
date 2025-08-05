import { MemberList } from '@/components/customs/dev/member/MemberList';
import { Header } from '@/components/customs/layouts/header';
import { fetcher } from '@/lib/dev/fetcher';

export default async function Member() {
  const pageSize = 1;
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
