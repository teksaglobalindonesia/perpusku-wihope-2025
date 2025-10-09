"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";

export default function PilihAnggota({
  onSelect,
}: {
  onSelect: (anggota: { id: string; name: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [anggotaList, setAnggotaList] = useState<any[]>([]);

  useEffect(() => {
    const fetchAnggota = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/member/list`, {
          headers: {
            Authorization: TOKEN,
            "x-wihope-name": WIHOPE_NAME,
          },
          cache: "no-store",
        });
        const data = await res.json();
        setAnggotaList(data.data || []);
      } catch (err) {
        console.error("Gagal ambil anggota:", err);
      }
    };
    fetchAnggota();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-navy text-white hover:bg-blue">PILIH</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg bg-white rounded shadow-lg p-4">
        <h2 className="text-lg font-bold mb-4">Pilih Anggota</h2>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {anggotaList.map((anggota: any) => (
            <div
              key={anggota.documentId}
              className="border p-3 rounded flex items-center justify-between"
            >
              <div>
                <p className="font-semibold">{anggota.name}</p>
                <p className="text-sm text-gray-500">Nomor: {anggota.nomor}</p>
                <p className="text-sm text-gray-500">Email: {anggota.email}</p>
              </div>
              <Button
                className="bg-green-500 text-white hover:bg-green-600"
                onClick={() => {
                  onSelect({ id: anggota.documentId, name: anggota.name });
                  setOpen(false);
                }}
              >
                PILIH
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
