"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";
import { useRouter } from "next/navigation";

export default function EditAnggota({ id }: { id: string }) {
  const router = useRouter();

  const [nomor, setNomor] = useState("");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [loading, setLoading] = useState(true);

  // ambil data lama
  useEffect(() => {
    const fetchAnggota = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/member/list?page=1&page_size=100`,
          {
            headers: {
              Authorization: TOKEN,
              "x-wihope-name": WIHOPE_NAME,
            },
            cache: "no-store",
          }
        );

        const json = await res.json();
        const list = Array.isArray(json.data)
          ? json.data
          : json.data?.items || [];
        const data = list.find((a: any) => a.documentId === id);

        if (data) {
          setNomor(data.id_member || "");
          setNama(data.name || "");
          setEmail(data.email || "");
          setAlamat(data.address || "");
        }
      } catch (err) {
        console.error("❌ Gagal ambil data anggota:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAnggota();
  }, [id]);

  // submit update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/member/edit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
          "x-wihope-name": WIHOPE_NAME,
        },
        body: JSON.stringify({
          documentId: id,
          data: {
            id_member: nomor,
            name: nama,
            email: email,
            address: alamat,
          },
        }),
      });

      const json = await res.json().catch(() => ({}));
      console.log("📩 Response API (edit):", json);

      if (!res.ok) {
        throw new Error("Update gagal: " + JSON.stringify(json));
      }

      alert("✅ Data anggota berhasil diperbarui!");
      router.push("/anggota"); 
      router.refresh();
    } catch (err) {
      console.error("❌ Error update anggota:", err);
      alert(
        "❌ Terjadi kesalahan saat update anggota. Lihat console untuk detail."
      );
    }
  };

  if (loading)
    return <p className="text-center mt-6">⏳ Loading data anggota...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-xl font-bold mb-4 text-center">
        Edit Anggota (DocumentId: {id})
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nomor
          </label>
          <Input
            value={nomor}
            onChange={(e) => setNomor(e.target.value)}
            placeholder="Nomor"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama
          </label>
          <Input
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alamat
          </label>
          <Input
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            placeholder="Alamat"
          />
        </div>
        <div className="flex gap-4">
          <Button
            type="submit"
            className="w-full bg-green-600 text-white hover:bg-green-500"
          >
            Simpan Anggota
          </Button>
        </div>
      </form>
    </div>
  );
}
