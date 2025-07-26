import Link from 'next/link';

export const Navbar = () => {

    return (

        <div className="relative flex items-center py-[30px] bg-[#ffffff] drop-shadow-md">

            <div className="absolute left-[50px]">
                <h1 className="text-[#74B6FF] font-bold text-xl">📖PERPUSKU</h1>
            </div>

            <div className="mx-auto flex flex-row space-x-10 text-[16px] text-gray-700 font-medium">
                <Link href="/">Dashboard</Link>
                <Link href="/buku">Buku</Link>
                <Link href="/anggota">Anggota</Link>
                <Link href="/peminjam">Peminjaman</Link>
                <Link href="#">Pengembalian</Link>
            </div>

        </div>

    );

};