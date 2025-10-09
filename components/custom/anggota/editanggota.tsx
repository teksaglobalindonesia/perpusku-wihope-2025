"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      alert("❌ Terjadi kesalahan saat update anggota. Lihat console untuk detail.");
    }
  };

  if (loading)
    return <p className="text-center mt-6">⏳ Loading data anggota...</p>;

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold text-navy mb-6 text-center">
            ✏️ Edit Anggota
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nomor */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-navy">
                Nomor Anggota
              </label>
              <Input
                value={nomor}
                onChange={(e) => setNomor(e.target.value)}
                placeholder="Nomor"
                className="rounded-lg border-navy focus:ring-2 focus:ring-navy/50"
              />
            </div>

            {/* Nama */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-navy">
                Nama
              </label>
              <Input
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama"
                className="rounded-lg border-navy focus:ring-2 focus:ring-navy/50"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-navy">
                Email
              </label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="rounded-lg border-navy focus:ring-2 focus:ring-navy/50"
              />
            </div>

            {/* Alamat */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-navy">
                Alamat
              </label>
              <Input
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                placeholder="Alamat"
                className="rounded-lg border-navy focus:ring-2 focus:ring-navy/50"
              />
            </div>

            {/* Tombol */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="w-full bg-navy text-white hover:bg-blue"
              >
                Simpan Perubahan
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => router.push("/anggota")}
              >
                Batal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
