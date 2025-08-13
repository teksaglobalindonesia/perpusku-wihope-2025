"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";
import { useState } from "react";

export default function TambahAnggotaForm() {
  const [nomor, setNomor] = useState("");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [responseData, setResponseData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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

      if (!res.ok) {
        throw new Error("Gagal menambah anggota baru");
      }

      const result = await res.json();
      setResponseData(result);

      setNomor("");
      setNama("");
      setEmail("");
      setAlamat("");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mencoba menambahkan anggota baru");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h1 className="text-xl font-bold mb-6 text-center">Tambah Anggota</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nomor
            </label>
            <Input
              placeholder="Masukkan Nomor"
              value={nomor}
              onChange={(e) => setNomor(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama
            </label>
            <Input
              placeholder="Masukkan Nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              placeholder="Masukkan Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alamat
            </label>
            <Input
              placeholder="Masukkan Alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-navy text-white hover:bg-blue"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan Anggota"}
          </Button>
        </form>

        {responseData && (
          <div className="mt-4 p-4 border rounded bg-green-50 text-green-700 text-sm">
            <p>Anggota baru berhasil ditambahkan</p>
            <p>
              <strong>ID:</strong> {responseData.id_member}
            </p>
            <p>
              <strong>Nama:</strong> {responseData.name}
            </p>
            <p>
              <strong>Email:</strong> {responseData.email}
            </p>
            <p>
              <strong>Alamat:</strong> {responseData.address}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
