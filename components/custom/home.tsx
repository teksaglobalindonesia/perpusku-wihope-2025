import Image from "next/image";
import Link from 'next/link';

export const Home = () => {

    return (

        <div className="mx-[223px] my-[90px]">
            <div className="z-10 absolute px-[26px] py-[69px]">
                <h1 className="text-[40px] font-semibold">Welcome back <span className="text-[#0097B2]">Wawan</span></h1>
                <p className="w-[334px]">Astamonilo Gagastaso Ismailla Rohujusamila islken ambduyw jsahad</p>
            </div>
            <Image
                src="/papan.png"
                alt="papan"
                width={994}
                height={248}
                className="rounded-lg drop-shadow-md z-0 relative"
            />
            <div className="flex flex-row gap-[84px] py-[27px] items-center justify justify-center mt-[27px]">
                <div className="bg-white rounded-lg drop-shadow-md z-0 relative w-[149px] h-[149px]">
                    <div>
                        <Image
                            src="/1.png"
                            alt="stok_buku"
                            width={60}
                            height={60}
                            className="rounded-lg z-10 absolute drop-shadow-md -top-6 -left-6"
                        />
                    </div>
                    <div className="text-center items-center pt-[50px]">
                        <h1 className="text-[#525252] font-medium text-lg pb-[26px]">Stok Buku</h1>
                        <Link href="/stok_buku"><button className="bg-[#86C56B] py-[3px] px-[35px] rounded-full text-white">View</button></Link>
                    </div>
                </div>
                <div className="bg-white rounded-lg drop-shadow-md z-0 relative w-[149px] h-[149px]">
                    <div>
                        <Image
                            src="/2.png"
                            alt="peminjaman"
                            width={60}
                            height={60}
                            className="rounded-lg z-10 absolute drop-shadow-md -top-6 -left-6"
                        />
                    </div>
                    <div className="text-center items-center pt-[50px]">
                        <h1 className="text-[#525252] font-medium text-lg pb-[26px] ">Peminjaman</h1>
                       <Link href="/peminjaman_buku"><button className="bg-[#0097B2] py-[3px] px-[35px] rounded-full text-white">View</button></Link> 
                    </div>
                </div>
                <div className="bg-white rounded-lg drop-shadow-md z-0 relative w-[149px] h-[149px]">
                    <div>
                        <Image
                            src="/3.png"
                            alt="pengembalian"
                            width={60}
                            height={60}
                            className="rounded-lg z-10 absolute drop-shadow-md -top-6 -left-6"
                        />
                    </div>
                    <div className="text-center items-center pt-[50px]">
                        <h1 className="text-[#525252] font-medium text-lg pb-[26px]">Pengembalian</h1>
                        <Link href="/pengembalian_buku"><button className="bg-[#E0B677] py-[3px] px-[35px] rounded-full text-white">View</button></Link>
                    </div>
                </div>
            </div>
        </div>

    );
};