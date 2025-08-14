import { BFormEdit } from '@/components/custom/BFormEdit';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <BFormEdit id={params.id}/>
    </>
  );
}
