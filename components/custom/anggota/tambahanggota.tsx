"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TambahAnggotaForm() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h1 className="text-xl font-bold mb-6 text-center">Tambah Anggota</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor</label>
            <Input placeholder="Masukkan Nomor" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
            <Input placeholder="Masukkan Nama" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input placeholder="Masukkan Email" type="email" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
            <Input placeholder="Masukkan Alamat" />
          </div>
          <Button type="submit" className="w-full bg-navy text-white hover:bg-blue">
            Simpan Anggota
          </Button>
        </form>
      </div>
    </div>
  );
}
