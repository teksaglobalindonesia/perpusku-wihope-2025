import { Card } from '@/components/custom/card';

export const DPinjaman = () => {
  return (
    <div className="mt-20 flex flex-col gap-4 rounded-2xl border border-beige-300 bg-beige-100 px-4 py-4 shadow-lg shadow-beige-300/30">
      {/* Header Section */}
      <div className="flex justify-between gap-2">
        <h3 className="font-vintage text-3xl font-semibold text-vintage-brown">
          Pinjaman Hari ini
        </h3>
        <input
          type="text"
          placeholder="Search..."
          className="w-48 rounded-sm border-2 border-beige-300 bg-beige-50 bg-opacity-70 px-4 
                     py-2 font-vintage italic text-beige-700 placeholder-beige-400 shadow-inner
                     transition-colors duration-200 focus:border-beige-400 
                     focus:bg-white focus:outline-none"
        />
      </div>

      {/* Card List */}
      <div className="flex flex-col gap-4">
        <Card
          cardItems={[
            {
              title: 'Buku Cara Jadi Fullstack Dalam 1 Hari',
              peminjam: 'Samsul',
              peminjaman: '17 Juli 2025, 09.00',
              pengembalian: '31 Juli 2025'
            },
            {
              title: 'Buku Cara Jadi Fullstack Dalam 1 Hari',
              peminjam: 'Samsul',
              peminjaman: '17 Juli 2025, 09.00',
              pengembalian: '31 Juli 2025'
            }
          ]}
        />
      </div>

      {/* Pagination - Vintage Style */}
      <div className="flex justify-center gap-2">
        <button className="rounded-md border border-beige-300 bg-beige-100 px-3 py-1 font-vintage text-beige-700 shadow-inner hover:bg-beige-200">
          Prev
        </button>
        <button className="rounded-md border border-beige-400 bg-beige-300 px-3 py-1 font-vintage text-beige-800 shadow-inner">
          1
        </button>
        <button className="rounded-md border border-beige-300 bg-beige-100 px-3 py-1 font-vintage text-beige-700 shadow-inner hover:bg-beige-200">
          Next
        </button>
      </div>
    </div>
  );
};
