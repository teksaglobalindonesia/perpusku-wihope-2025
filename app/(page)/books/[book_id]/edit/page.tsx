import { BASE_URL } from '@/lib/constant';
import { fetcher } from '@/lib/fetcher';

export default async function AddBookForm({ params }: { params: any }) {
  const bookId = decodeURIComponent(params?.book_id);

  const bookData = await fetcher({
    path: `/surya-books/${bookId}`,
    query: 'populate=cover&populate=categories'
  });
  // console.log(bookData.data?.data);

  return (
    <div className="mx-auto  flex flex-col items-center justify-center rounded-md border p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">
        Edit Buku{' '}
        <span className="text-brand-primary">{bookData.data?.data?.title}</span>
      </h2>

      <div className="w-[75%] rounded-[20px] bg-neutral-silver p-[30px]">
        <div>
          <label className="mb-1 block font-medium">Judul</label>
          <input
            type="text"
            className="w-full rounded border px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={bookData?.data?.data?.title}
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Penulis</label>
          <input
            type="text"
            className="w-full rounded border px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={bookData?.data?.data?.writer}
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Penerbit</label>
          <input
            type="text"
            className="w-full rounded border px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={bookData?.data?.data?.publisher}
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Tahun Terbit</label>
          <input
            type="text"
            className="w-full rounded border px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={bookData?.data?.data?.published_year}
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Kategori</label>
          <button
            type="button"
            className="mb-2 rounded bg-brand-blue px-2 py-1 text-sm font-semibold text-white"
          >
            TAMBAH KATEGORI
          </button>
          <div className="ml-1 space-y-1">
            {bookData?.data?.data?.categories?.map((data: any, i: number) => (
              <div key={i} className="flex w-max gap-[2px]">
                <input type="checkbox" checked />
                <label htmlFor="">{data?.name}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1 block font-medium">Stok</label>
          <input
            type="number"
            className="w-full rounded border px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={bookData?.data?.data?.stock}
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Cover</label>
          <label className="inline-block cursor-pointer rounded bg-brand-blue px-3 py-1 font-medium text-white transition hover:bg-yellow-500">
            Pilih Gambar
            <input type="file" accept="image/*" className="hidden" />
          </label>

          <div className=" mt-2">
            <img
              src={`${BASE_URL}${bookData?.data?.data?.cover?.url}`}
              alt=""
              className="w-[300px] rounded-[10px] object-cover"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded bg-green-500 py-2 text-white transition hover:bg-green-600"
        >
          SIMPAN BUKU
        </button>
      </div>
    </div>
  );
}
