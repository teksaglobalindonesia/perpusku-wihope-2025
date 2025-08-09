import Image from 'next/image';

export type StokHabisProps = {
  items?: Array<{
    img?: string;
    judul?: string;
    genre?: string;
    penulis?: string;
    stok?: string;
  }>;
};

export function StokHabis({ ...props }: StokHabisProps) {
  return (
    <div className="mx-6 my-4 text-[#DFD0B8]">
      <h1 className="pt-6 text-center font-playwrite text-3xl font-bold text-[#DFD0B8]">
        Dashboard
      </h1>
      <div>
        <div className="m-11 rounded-lg bg-[#393E46] p-6">
          <div className="flex flex-row items-center justify-between">
            <h2 className='text-lg font-semibold'>Buku Stok Habis</h2>
            <input
              type="text"
              placeholder="Search..."
              className="rounded-lg border-2 bg-white px-4 py-1 text-black"
            />
          </div>

          <div className="mt-6 space-y-4">
            {props.items?.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-[#948979] px-4 py-3 shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12">
                    <Image
                      src={item.img || '/placeholder-image.png'}
                      alt="Cover Buku"
                      className="h-full w-full rounded object-cover"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="text-[#DFD0B8]">
                    <div className="font-bold">
                      {item.judul || 'Judul Buku'}
                    </div>
                    <div className="text-sm">{item.genre || 'Genre'}</div>
                    <div className="text-sm">{item.penulis || 'Penulis'}</div>
                  </div>
                </div>
                <div>
                  <span className="rounded bg-red-600 px-4 py-2 text-xs font-bold text-white">
                    {item.stok}
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
