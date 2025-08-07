"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/custom/navbar";
import { AnggotaHero } from "@/components/custom/anggotaHero";
import { Footer } from "@/components/custom/footer";
import Pagination from "@/components/custom/pagination";
import Link from "next/link";
import { TOKEN, WIHOPE_NAME, BASE_URL } from "@/lib/constant";


export default function AnggotaPage() {
const [members, setMembers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [totalMembers, setTotalMembers] = useState(0);

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const url = `${BASE_URL}/api/member/list?page=${currentPage}&page_size=${itemsPerPage}&search=${encodeURIComponent(search)}`;
        const member = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: TOKEN,
            "x-wihope-name": WIHOPE_NAME,
          },
          cache: "no-store",
        });

        const dataMembers = await member.json();

        const formatted = dataMembers.data.map((item: any) => ({
        id: item.id_member,
        name: item.name,
        email: item.email,
        address: item.address,
        id_member: item.id_member
        }));

        setMembers(formatted);
        setTotalMembers(dataMembers.total);
      } catch (error) {
        console.error("Gagal mengambil data anggota:", error);
      }
    };

    fetchMembers();
  }, [search, currentPage]);


  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [search]);

  // const filteredMembers = members.filter((member: any) =>
  //   member.name.toLowerCase().includes(search.toLowerCase())
  // );

  const totalPages = Math.ceil(totalMembers / itemsPerPage);

  const handleClickDelete = (index: number) => {
    setSelectedMember(index);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedMember !== null) {
      const deletedMember = members[selectedMember].name;
      alert(`Anggota "${deletedMember}" berhasil dihapus!`);
      setShowConfirm(false);
      setSelectedMember(null);
    }
  };


return (
    <>
      <Navbar />
      <AnggotaHero />
      <div className="p-6 bg-tint-4 min-h-screen">
        <div className="flex justify-center items-center mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="border px-3 py-1 rounded text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link href="/Anggota/tambah">
              <button className="bg-action-success text-neutral-white px-4 py-1 rounded text-sm">
                TAMBAH
              </button>
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          {members.map((item, index) => (
            <div
              key={index}
              className="bg-neutral-white flex justify-between items-center rounded-md shadow px-6 py-4 border"
            >
              <div className="flex gap-4 items-start">
                <div>
                  <h3 className="text-neutral-dbrown font-semibold text-[18px] font-inter">
                    {item.name} <span className="font-normal text-action-warning text-[15px]">{item.id_member}</span>
                  </h3>
                  <p className="text-[14px] text-neutral-mbrown">
                    Email: <span className="font-semibold">{item.email}</span> <br />
                    Alamat: <span className="font-semibold">{item.address}</span> <br />

                  </p>
                  <div className="mt-2 flex gap-2">
                    <Link
                      href="/Anggota/peminjaman"
                      onClick={() =>
                        localStorage.setItem("anggotaPeminjaman", JSON.stringify(item))
                      }
                    >
                      <button className="bg-brand-secondary text-neutral-white text-[12px] px-2 py-1 rounded">PEMINJAMAN</button>
                    </Link>
                    <Link
                      href="/Anggota/edit"
                      onClick={() =>
                        localStorage.setItem("editAnggota", JSON.stringify(item))
                      }
                    >
                      <button className="bg-neutral-beige text-neutral-dbrown text-[12px] px-2 py-1 rounded">
                        EDIT
                      </button>
                    </Link>
                    <button
                      onClick={() => handleClickDelete(index)}
                      className="bg-brand-secondary text-neutral-white text-[12px] px-2 py-1 rounded"
                    >
                      HAPUS
                    </button>
                    {showConfirm && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="bg-tint-4 rounded-md p-6 w-[350px] shadow-lg text-center">
                          <p className="text-sm text-neutral-dbrown mb-4">
                            Apakah yakin menghapus anggota ini?
                          </p>
                          <div className="flex justify-center gap-4">
                            <button
                              onClick={confirmDelete}
                              className="bg-action-error hover:bg-red-500 text-neutral-white px-4 py-1 rounded text-sm"
                            >
                              Hapus
                            </button>
                            <button
                              onClick={() => setShowConfirm(false)}
                              className="bg-brand-info hover:bg-gray-400 text-neutral-white px-4 py-1 rounded text-sm"
                            >
                              Batal
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
      <Footer />
    </>
  );
}

