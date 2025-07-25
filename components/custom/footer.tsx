import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-neutral-dbrown text-neutral-white px-[165px] py-[64px] mt-20">
      <div className="flex flex-row justify-between gap-[125px]">
        <div className="flex flex-col gap-4">
          <div className="mb-1 bg-tint-3 px-2 rounded-lg">
            <Image
              src="/aset/Logo.png"
              alt="Logo"
              width={191}
              height={29.67}
              quality={100}
            />
          </div>

          <p className="text-sm text-neutral-300">
            Menyediakan berbagai koleksi <br />
            buku bacaan, referensi, dan literatur digital <br />
            untuk menunjang pendidikan dan <br />
            pengetahuan siswa.
          </p>

          <p className="text-[14px] text-neutral-beige font-inter">
            Copyright © 2025 PerpusQu.
          </p>
          <p className="text-[14px] text-neutral-beige font-inter mb-2">
            All rights reserved
          </p>

          <div className="flex gap-4 mt-2">
            <a
              href="https://youtube.com/@noviaa.shwy00?si=pzJH8O043qRKKWPV"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-sbrown cursor-pointer">
                <Image src="/aset/Youtube.png" alt="YouTube" width={17} height={17} />
              </div>
            </a>
            <a
              href="https://www.instagram.com/siwinoviantii"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-sbrown cursor-pointer">
                <Image src="/aset/Instagram.png" alt="Instagram" width={17} height={17} />
              </div>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-neutral-white font-semibold mb-3 font-inter text-[20px]">
            Navigasi
          </h3>
          <ul className="text-neutral-300 text-sm space-y-2">
            <li><a href="/">Dashboard</a></li>
            <li><a href="/Buku">Buku</a></li>
            <li><a href="/Anggota">Anggota</a></li>
            <li><a href="/Peminjaman">Peminjaman</a></li>
            <li><a href="/Pengembalian">Pengembalian</a></li>
          </ul>
        </div>

        <div className="w-fit">
        <h3 className="text-neutral-white font-semibold mb-3 font-inter text-[20px]">
            Lokasi
        </h3>
        <p className="text-neutral-300 text-sm">
            Jl. Kebo Iwa Selatan No. 10<br />
            Denpasar, Bali 80115
        </p>
        </div>

        <div className="w-fit">
            <h3 className="text-neutral-white font-semibold mb-3 font-inter text-[20px]">
                Kontak
            </h3>
            <ul className="text-neutral-300 text-sm space-y-2">
                <li>Email: info@perpusqu.sch.id</li>
                <li>Telp: (0361) 1234567</li>
                <li>WhatsApp: 0899-9999-329</li>
            </ul>
        </div>
      </div>
    </footer>
  );
};
