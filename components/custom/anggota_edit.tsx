"use client";

import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export const Edit_anggota = () => {
  const searchParams = useSearchParams();
  const documentId = searchParams.get("id");
  const router = useRouter();
  const [nomor, setNomor] = useState("");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");

  useEffect(() => {
    if (!documentId) return;
    const fetchDetail = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/member/detail?documentId=${documentId}`,
          {
            headers: {
              Authorization: TOKEN,
              "x-wihope-name": WIHOPE_NAME,
            },
          }
        );
        const result = await res.json();
        if (res.ok) {
          setNomor(result.data.id_member || "");
          setNama(result.data.name || "");
          setEmail(result.data.email || "");
          setAlamat(result.data.address || "");
        } else {
          alert("Gagal ambil data detail");
        }
      } catch (error) {
        console.error("Error fetch detail:", error);
      }
    };
    fetchDetail();
  }, [documentId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentId) return;

    try {
      const res = await fetch(`${BASE_URL}/api/member/edit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
          "x-wihope-name": WIHOPE_NAME,
        },
        body: JSON.stringify({
          documentId,
          data: {
            name: nama,
            email,
            address: alamat,
            id_member: nomor,
          },
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.message || "Gagal update anggota");
        return;
      }

      alert("Anggota berhasil diperbarui!");
      router.push("/anggota");
    } catch (error) {
      console.error("Error update:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-[#000000] mb-8 pb-4">
        ✏️ Edit Anggota
      </h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nomor" className="block text-sm font-medium text-gray-700 mb-1">
            Nomor
          </label>
          <input
            type="text"
            id="nomor"
            value={nomor}
            onChange={(e) => setNomor(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#5bbd87] focus:outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">
            Nama
          </label>
          <input
            type="text"
            id="nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#5bbd87] focus:outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#5bbd87] focus:outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="alamat" className="block text-sm font-medium text-gray-700 mb-1">
            Alamat
          </label>
          <input
            type="text"
            id="alamat"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#5bbd87] focus:outline-none"
            required
          />
        </div>

        <div className="pt-6 flex flex-row gap-2">
          <button
            type="submit"
            className="bg-[#5bbd87] text-white px-5 py-2 rounded-lg shadow hover:bg-[#4a996d] transition"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};