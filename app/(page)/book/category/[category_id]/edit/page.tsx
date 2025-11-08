import { CategoryForm } from '@/components/customs/category/CategoryForm';
import { fetcher } from '@/lib/fetcher';

export default async function EditCategory({ params }: { params: any }) {
  const categoryData = await fetcher({ path: `/book-category/list` });
  const filterdCategory = categoryData?.data?.data.find(
    (data: any) => data?.documentId == params.category_id
  );

  return (
    <div>
      <CategoryForm
        type="edit"
        data={filterdCategory}
        documentId={params?.category_id}
      />
    </div>
  );
}
