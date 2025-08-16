import { BASE_URL } from '@/lib/constant';

export function StokHabis({ books }: { books: any[] }) {
  const bookhabis = books.filter((book) => book.stock === 0);
  const API = BASE_URL;
  const bookList = Array.isArray(books) ? books : [];

  return (
    <div className="mx-6 my-4 text-[#DFD0B8]">
      <h1 className="pt-6 text-center font-playwrite text-3xl font-bold text-[#DFD0B8]">
        Dashboard
      </h1>
      <div>
        <div className="m-11 rounded-lg bg-[#393E46] p-6">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-lg font-semibold">Buku Stok Habis</h2>
            <input
              type="text"
              placeholder="Search..."
              className="rounded-lg border-2 bg-white px-4 py-1 text-black"
            />
          </div>

          <div className="mt-6 space-y-4">
            {bookhabis.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg bg-[#948979] px-4 py-3 shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <img
                      src={
                        item.cover
                          ? API + item.cover.url
                          : '/placeholder-image.png'
                      }
                      alt="Cover Buku"
                      className="rounded object-cover"
                      width={64}
                      height={96}
                    />
                  </div>
                  <div className="text-[#DFD0B8]">
                    <div className="font-bold">
                      {item.title || 'Judul Buku'}
                    </div>
                    <div className="text-sm">
                      {item.categories?.[0]?.name || 'Categories'}
                    </div>
                    <div className="text-sm">{item.writer || 'Writer'}</div>
                  </div>
                </div>
                <div>
                  <span
                    className={`mt-3 self-center rounded px-3 py-1 text-sm font-bold sm:mt-0 sm:self-auto
              ${
                item.stock === 0
                  ? 'bg-red-600 text-white'
                  : 'bg-yellow-600 text-white'
              }`}
                  >
                    {item.stock === 0 ? 'STOK HABIS' : `Stok: ${item.stock}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
