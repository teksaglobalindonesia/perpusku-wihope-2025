"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";
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

      if (!res.ok) throw new Error("Gagal menambah anggota baru");

      const result = await res.json();
      setResponseData(result);

      setNomor("");
      setNama("");
      setEmail("");
      setAlamat("");
    } catch (error) {
      alert("Terjadi kesalahan saat mencoba menambahkan anggota baru");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-navy text-center">
            Tambah Anggota
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Nomor */}
            <div>
              <label className="block text-sm font-medium text-navy mb-1">
                Nomor Anggota
              </label>
              <Input
                placeholder="Masukkan nomor anggota"
                value={nomor}
                onChange={(e) => setNomor(e.target.value)}
                required
              />
            </div>

            {/* Nama */}
            <div>
              <label className="block text-sm font-medium text-navy mb-1">
                Nama Lengkap
              </label>
              <Input
                placeholder="Masukkan nama lengkap"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-navy mb-1">
                Email
              </label>
              <Input
                placeholder="Masukkan email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Alamat */}
            <div>
              <label className="block text-sm font-medium text-navy mb-1">
                Alamat
              </label>
              <Input
                placeholder="Masukkan alamat"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                required
              />
            </div>

            {/* Tombol */}
            <Button
              type="submit"
              className="w-full bg-navy text-white hover:bg-blue rounded-lg"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan Anggota"}
            </Button>
          </form>

          {/* Alert sukses */}
          {responseData && (
            <Alert className="mt-6 border-green-600 bg-green-50">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-700 font-semibold">
                Berhasil
              </AlertTitle>
              <AlertDescription className="text-green-700 text-sm">
                Anggota baru berhasil ditambahkan <br />
                <strong>ID:</strong> {responseData.id_member} <br />
                <strong>Nama:</strong> {responseData.name} <br />
                <strong>Email:</strong> {responseData.email} <br />
                <strong>Alamat:</strong> {responseData.address}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
