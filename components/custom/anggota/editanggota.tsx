"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditAnggota({ id }: { id: string }) {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-xl font-bold mb-4 text-center">Edit Anggota (ID: {id})</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nomor</label>
          <Input placeholder="Nomor" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
          <Input placeholder="Nama" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <Input placeholder="Email" type="email" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
          <Input placeholder="Alamat" />
        </div>
        <div className="flex gap-4">
          <Button type="submit" className="w-full bg-green-600 text-white hover:bg-green-500">
            Simpan Anggota
          </Button>
          <Button type="button" className="w-full  bg-red-500 text-black hover:bg-red-600">
            Hapus Anggota
          </Button>
        </div>
      </form>
    </div>
  );
}
