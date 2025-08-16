export type PengembalianProps = {
  items?: Array<{
    judul?: string;
    peminjam?: string;
    tanggalPinjam?: string;
    jamPinjam?: string;
    tanggalKembali?: string;
    
  }>;
};

export default function PengembalianHariIni({ ...props }: PengembalianProps) {
  return (
    <div className="mx-6 my-4 text-[#DFD0B8]">
      <div className="m-11 rounded-lg bg-[#393E46] p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Pengembalian Hari Ini</h2>
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
              className="flex justify-between rounded-lg bg-[#948979] px-6 py-4 shadow-md"
            >
              <div>
                <div className="text-[#DFD0B8]">
                  <div className="font-bold">{item.judul || 'Judul Buku'}</div>
                  <div className="text-sm">
                    Peminjam: {item.peminjam || '-'}
                  </div>
                  <div className="text-sm">
                    Peminjaman: {item.tanggalPinjam || '-'}
                    {item.jamPinjam ? `, ${item.jamPinjam}` : ''}
                  </div>
                  <div className="text-sm">
                    Pengembalian: {item.tanggalKembali || '-'}
                  </div>
                </div>
              </div>
              <div className="flex my-auto h-full px-4 py-2 bg-green-600 rounded-lg text-sm">
                <h2 className="">Kembalikan</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
