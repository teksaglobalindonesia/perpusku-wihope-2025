import Image from "next/image";
import Link from 'next/link';

export const Home = () => {

    return (

        <div className="mx-[223px] my-[90px]">
            <Image
                src="/Banner.png"
                alt="Banner"
                width={994}
                height={248}
                className="rounded-lg drop-shadow-md"
            />
            <div className="flex flex-row gap-[84px] py-[27px] items-center justify justify-center">
                <Link href="/stok_buku">
                    <Image
                        src="/Stok.png"
                        alt="Stok_buku"
                        width={171}
                        height={170}
                        className="rounded-lg drop-shadow-md hover:drop-shadow-xl"
                    />
                </Link>
                <Link href="/peminjaman_buku">
                    <Image
                        src="/Peminjam.png"
                        alt="Peminjaman"
                        width={171}
                        height={170}
                        className="rounded-lg drop-shadow-md hover:drop-shadow-xl"
                    />
                </Link>
                <Link href="/pengembalian_buku">
                    <Image
                        src="/Kembalikan.png"
                        alt="Pengembalian"
                        width={171}
                        height={170}
                        className="rounded-lg drop-shadow-md hover:drop-shadow-xl"
                    />
                </Link>
            </div>
        </div>

    );
};