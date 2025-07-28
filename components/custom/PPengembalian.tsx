import Link from 'next/link';
import { Card } from '../custom/card';
import { Search } from 'lucide-react'; // Import icon search dari Lucide

const rawData = [
  {
    title: 'Buku Pemrograman React',
    peminjam: 'Ahmad Santoso',
    peminjaman: '2023-10-01',
    pengembalian: '2023-10-15',
    dikembalikan: '2023-10-14'
  },
  {
    title: 'Buku Pemrograman Vue',
    peminjam: 'Budi Santoso',
    peminjaman: '2023-10-01',
    pengembalian: '2023-10-15',
    dikembalikan: '2023-10-20'
  },
  {
    title: 'Buku Pemrograman Angular',
    peminjam: 'Siti Santoso',
    peminjaman: '2023-10-01',
    pengembalian: '2023-10-15',
    dikembalikan: '2023-10-14'
  },
  {
    title: 'Buku Pemrograman React Native',
    peminjam: 'Rudi Santoso',
    peminjaman: '2023-10-01',
    pengembalian: '2023-10-15',
    dikembalikan: '2023-10-17'
  }
];

const terlambat = (pengembalian: string, dikembalikan: string) => {
  return new Date(dikembalikan) > new Date(pengembalian);
};

const pengembalianItems = rawData.map((item) => ({
  ...item,
  label: terlambat(item.pengembalian, item.dikembalikan)
    ? ('terlambat' as const)
    : undefined,
  showButton: false
}));

export const PPengembalian = () => {
  return (
    <div className="bg-dusty-200 rounded-lg min-h-screen p-8">
      <div className="flex flex-col">
        {/* Header Section */}
        <div className="mb-8 border-b border-vintage-terracotta pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-vintage text-vintage-brown mb-2">Riwayat Pengembalian</h1>
              <p className="font-vintage text-vintage-slate italic">
                Catatan literatur yang telah kembali ke rak pengetahuan
              </p>
            </div>
            
            {/* Tombol Tambah dengan Link */}
            <Link 
              href="" 
              className="flex items-center justify-center gap-2 bg-vintage-sage hover:bg-vintage-sage/90 text-white font-vintage px-4 py-2 rounded-md transition-colors shadow-md hover:shadow-lg"
            >
              <span className="text-lg">+</span>
              Tambah Data
            </Link>
          </div>
          
          {/* Search Input */}
          <div className="mt-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-vintage-terracotta" />
            </div>
            <input
              type="text"
              placeholder="Cari riwayat pengembalian..."
              className="block w-full pl-10 pr-3 py-2 border border-vintage-parchment rounded-md bg-white bg-opacity-70 focus:outline-none focus:ring-1 focus:ring-vintage-sage focus:border-vintage-sage font-vintage text-vintage-brown placeholder-vintage-slate/70"
            />
          </div>
        </div>
        
        {/* Card Container */}
        <div className="space-y-6">
          <Card cardItems={pengembalianItems} />
        </div>
      </div>
    </div>
  );
};