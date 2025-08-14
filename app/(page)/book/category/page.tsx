import { CategoryList } from '@/components/customs/category/CategoryList';
import { fetcher } from '@/lib/fetcher';

export default async function EditCategory() {
  const categoryList = await fetcher({ path: '/book-category/list' });
  return (
    <div className="p-[50px]">
      <CategoryList data={categoryList.data?.data} />
    </div>
  );
}
