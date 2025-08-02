import { BASE_URL } from '@/lib/constant';
import { CardGambar } from './cardGambar';

export const Dashboard = ({ data }: { data: any[] }) => {
  return (
    <div className="mt-20 flex flex-col gap-4 rounded-2xl border border-beige-300 bg-beige-50 px-4 py-4 shadow-lg shadow-beige-200/50">
      {/* Header Section */}
      <div className="flex justify-between gap-2">
        <h3 className="font-vintage text-3xl font-semibold text-vintage-brown">
          Buku stok habis
        </h3>
        <input
          type="text"
          placeholder="Search..."
          className="w-48 rounded-sm border-2 border-beige-300 bg-beige-100 bg-opacity-70 px-4 
            py-2 font-vintage italic text-beige-700 placeholder-beige-400 shadow-inner
            transition-colors duration-200 focus:border-beige-400 
            focus:bg-white focus:outline-none"
        />
      </div>
      {/* Card Grid Section */}
      <div className="flex flex-col gap-4">
        <CardGambar
          cardItems={(data ?? []).map((bookData: any, index) => ({
            imageSrc: `${BASE_URL}` + bookData?.cover?.url,
            title: bookData?.title,
            genre: bookData?.categories?.map((c: any) => c.name).join(', '),
            author: bookData?.writer,
            stock: bookData?.stock
          }))}
        />
      </div>

      <div className="flex justify-center gap-2"></div>
    </div>
  );
};
