import { BackButton } from '../common/BackButton';
import Link from 'next/link';

type CategoryListPropType = {
  data: any;
};

export const CategoryList = ({ data }: CategoryListPropType) => {
  // console.log(data);
  return (
    <>
      <BackButton />
      <div className="justify-betweenmb-2 flex w-full flex-col items-center justify-between gap-[15px] px-5 py-5 sm:flex-row">
        <h1 className="mt-5 text-2xl font-semibold">List Kategori</h1>
        <Link href={'/book/category/new'}>
          <p className='className="w-full text-white" rounded-sm bg-brand-primary px-4 py-1 text-center text-white'>
            Tambah
          </p>
        </Link>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
        {data?.map((item: any, i: number) => (
          <Link href={`/book/category/${item.documentId}/edit`} key={i}>
            <div className="flex cursor-pointer items-center gap-3 rounded-lg bg-brand-primary p-4 text-white shadow-md transition-shadow hover:shadow-lg">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white font-bold text-brand-blue">
                {i + 1}
              </span>
              <h1 className="text-lg font-medium">{item?.name}</h1>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
