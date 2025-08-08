import { fetcher } from '@/lib/fetcher';
import { MemberForm } from '@/components/customs/member/MemberForm';

export default async function EditMemberPage({ params }: { params: any }) {
  const MemberData = await fetcher({
    path: `/member/detail`,
    query: `id=${params?.user_id}`
  });

  return (
    <div className="w-full">
      <MemberForm type="edit" title="Edit Member" data={MemberData?.data} />
    </div>
  );
}
