export const BorrowedBooksSection = ({ data }: { data: any }) => {
  return (
    <div>
      <h1 className="py-4 text-3xl font-semibold">Peminjaman</h1>
      <p className="mb-2 text-2xl font-semibold">{data?.nama}</p>
      <div className="grid grid-cols-1 gap-[15px]">
        {data?.borrowed?.map((data: any, i: number) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-[10px] bg-neutral-silver px-4 py-2"
          >
            <div className="flex flex-col gap-[5px]">
              <p className="text-2xl font-semibold">{data?.buku?.judul}</p>
              <p>Peminjaman: {data?.tanggalPinjam}</p>
              <p>Pengembalian: {data?.tanggalJatuhTempo}</p>
            </div>
            <button
              className={`rounded-[5px] px-5 py-2 text-white ${
                data?.status == 'returned'
                  ? 'bg-brand-primary'
                  : data?.status === 'borowed'
                  ? 'bg-brand-blue'
                  : 'bg-action-error'
              }`}
            >
              {data?.status == 'returned'
                ? 'DIKEMBALIKAN'
                : data?.status === 'borowed'
                ? 'DIPINJAM'
                : '-'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
