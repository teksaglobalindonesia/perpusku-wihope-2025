"use client";

import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";
import { useState } from "react";

export const Tambah_anggota = () => {
  const [nomor, setNomor] = useState("");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [loading, setLoading] = useState(false);
  const [pesan, setPesan] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPesan("");

    try {
      const res = await fetch(`${BASE_URL}/api/member/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
          "x-wihope-name": WIHOPE_NAME,
        },
        body: JSON.stringify({
          data: {
            name: nama,
            email: email,
            address: alamat,
            id_member: nomor,
          },
        }),
        cache: "no-store",
      });

      const result = await res.json();

      if (res.ok) {
        setPesan("Berhasil menambahkan anggota!");
        setNomor("");
        setNama("");
        setEmail("");
        setAlamat("");
      } else {
        setPesan(`Gagal: ${result.message || "Terjadi kesalahan"}`);
      }
    } catch (error) {
      setPesan("Error saat mengirim data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-[#000000] mb-8 pb-4">
        ✏️ Tambah Data Anggota
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
            placeholder="Masukkan Nomor"
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
            placeholder="Masukkan Nama"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#5bbd87] focus:outline-none"
            placeholder="Masukkan Email"
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
            placeholder="Masukkan Alamat"
            required
          />
        </div>

        {pesan && <p className="text-sm mt-2">{pesan}</p>}

        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#5bbd87] text-white px-5 py-2 rounded-lg shadow hover:bg-[#4a996d] transition disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};
