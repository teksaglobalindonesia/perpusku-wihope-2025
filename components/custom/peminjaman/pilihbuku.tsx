"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function PilihBuku({
  onSelect,
}: {
  onSelect: (buku: { id: number; title: string }) => void;
}) {
  const [open, setOpen] = useState(false);

  const dummyBuku = [
    { id: 1, title: "Pesta Bunuh Diri", genre: "Horor", author: "Daniel Ahmad", stock: 2 },
    { id: 2, title: "Indigo Tapi Penakut", genre: "Fiksi Remaja", author: "Angeline Stevanie", stock: 1 },
    { id: 3, title: "Cantik itu Luka", genre: "Historical", author: "Eka Kurniawan", stock: 0 },
    { id: 4, title: "Magma", genre: "Romantis", author: "Geladis Afira", stock: 2 },
    { id: 5, title: "7 Prajurit Bapak", genre: "Fiksi Remaja", author: "Wulan Nuramalia", stock: 1 },
    { id: 6, title: "Laut Bercerita", genre: "Persahabatan", author: "Leila S. Chudori", stock: 0 },
    { id: 7, title: "Re: dan peRempuan", genre: "Kisah Nyata", author: "Maman Suherman", stock: 1 },
  ];

  const bukuTersedia = dummyBuku.filter((buku) => buku.stock > 0);

  const handleSelect = (buku: { id: number; title: string }) => {
    onSelect(buku);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" className="bg-navy text-white">
          PILIH
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto space-y-3">
        <h2 className="text-lg font-bold text-navy">Pilih Buku</h2>
        {bukuTersedia.length === 0 ? (
          <p className="text-sm text-gray-500">Tidak ada buku yang tersedia.</p>
        ) : (
          bukuTersedia.map((buku) => (
            <div
              key={buku.id}
              className="flex justify-between items-center border p-2 rounded shadow-sm"
            >
              <div>
                <p className="font-semibold">{buku.title}</p>
                <p className="text-sm text-gray-600">
                  {buku.genre} - {buku.author}
                </p>
                <p className="text-sm">Stok: {buku.stock}</p>
              </div>
              <Button
                className="bg-green-500 text-white"
                onClick={() => handleSelect({ id: buku.id, title: buku.title })}
              >
                PILIH
              </Button>
            </div>
          ))
        )}
      </DialogContent>
    </Dialog>
  );
}
