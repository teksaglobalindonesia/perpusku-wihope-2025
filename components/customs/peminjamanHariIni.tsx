  import Image from 'next/image';

  export type PeminjamanProps = {
    items?: Array<{
      judul?: string;
      peminjam?: string;
      tanggalPinjam?: string;
      jamPinjam?: string;
      tanggalKembali?: string;
    }>;
  };

  export default function PeminjamanHariIni({...props }: PeminjamanProps) {
    return (
      <div className="mx-6 my-4 text-[#DFD0B8]">
        <div className="rounded-lg bg-[#393E46] p-6 m-11">

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Peminjaman Hari Ini</h2>
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
                className="rounded-lg bg-[#948979] px-6 py-4 shadow-md"
              >
                <div className="text-[#DFD0B8]">
                  <div className="font-bold">{item.judul || 'Judul Buku'}</div>
                  <div className="text-sm">Peminjam: {item.peminjam || '-'}</div>
                  <div className="text-sm">
                    Peminjaman: {item.tanggalPinjam || '-'}
                    {item.jamPinjam ? `, ${item.jamPinjam}` : ''}
                  </div>
                  <div className="text-sm">
                    Pengembalian: {item.tanggalKembali || '-'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
