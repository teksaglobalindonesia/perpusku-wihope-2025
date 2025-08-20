import Image from "next/image";
import Link from 'next/link';

export const Home = () => {
    return (
        <div className="px-6 py-12 md:px-20 md:py-24 bg-gray-50 min-h-screen">
     
            <div className="mb-12">
                <h1 className="text-3xl md:text-5xl font-semibold text-gray-800">
                    Welcome back <span className="text-[#0097B2]">Wawan</span>
                </h1>
                <p className="mt-4 text-gray-600 max-w-md">
                    Astamonilo Gagastaso Ismailla Rohujusamila islken ambduyw jsahad
                </p>
            </div>

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {[
                    { title: "Stok Buku", href: "/stok_buku", color: "#86C56B", img: "/1.png" },
                    { title: "Peminjaman", href: "/peminjaman_buku", color: "#0097B2", img: "/2.png" },
                    { title: "Pengembalian", href: "/pengembalian_buku", color: "#E0B677", img: "/3.png" }
                ].map((item, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 flex flex-col items-center text-center"
                    >
                        <div className="w-20 h-20 mb-4">
                            <Image
                                src={item.img}
                                alt={item.title.toLowerCase()}
                                width={80}
                                height={80}
                                className="rounded-xl object-cover"
                            />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">{item.title}</h2>
                        <Link href={item.href}>
                            <button
                                style={{ backgroundColor: item.color }}
                                className="text-white px-6 py-2 rounded-full text-sm hover:opacity-90 transition"
                            >
                                View
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};
