"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";

export default function PilihBuku({
  onSelect,
}: {
  onSelect: (buku: { id: string; title: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [bukuList, setBukuList] = useState<any[]>([]);

  useEffect(() => {
    const fetchBuku = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/book/list`, {
          headers: {
            Authorization: TOKEN,
            "x-wihope-name": WIHOPE_NAME,
          },
          cache: "no-store",
        });
        const data = await res.json();
        setBukuList(data.data || []);
      } catch (err) {
        console.error("Gagal ambil buku:", err);
      }
    };
    fetchBuku();
  }, []);

  const bukuTersedia = bukuList.filter((b: any) => b.stock > 0);

  const handleSelect = (buku: { id: string; title: string }) => {
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
          bukuTersedia.map((buku: any) => (
            <div
              key={buku.documentId}
              className="flex justify-between items-center border p-2 rounded shadow-sm"
            >
              <div>
                <p className="font-semibold">{buku.title}</p>
                <p className="text-sm text-gray-600">
                  {buku.kategorises?.map((k: any) => k.name).join(", ")} - {buku.author}
                </p>
                <p className="text-sm">Stok: {buku.stock}</p>
              </div>
              <Button
                className="bg-green-500 text-white"
                onClick={() => handleSelect({ id: buku.documentId, title: buku.title })}
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
