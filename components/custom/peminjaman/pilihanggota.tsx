"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const dummyAnggota = [
  { id: 1, name: "Nama Anggota 1", nomor: "111111", email: "anggota1@gmail.com" },
  { id: 2, name: "Nama Anggota 2", nomor: "222222", email: "anggota2@gmail.com" },
  { id: 3, name: "Nama Anggota 3", nomor: "333333", email: "anggota3@gmail.com" },
  { id: 4, name: "Nama Anggota 4", nomor: "444444", email: "anggota4@gmail.com" },
  { id: 5, name: "Nama Anggota 5", nomor: "555555", email: "anggota5@gmail.com" },
  { id: 6, name: "Nama Anggota 6", nomor: "666666", email: "anggota6@gmail.com" },
];

export default function PilihAnggota({
  onSelect,
}: {
  onSelect: (anggota: { id: number; name: string }) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-navy text-white hover:bg-blue">PILIH</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg bg-white rounded shadow-lg p-4">
        <h2 className="text-lg font-bold mb-4">Pilih Anggota</h2>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {dummyAnggota.map((anggota) => (
            <div
              key={anggota.id}
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
                  onSelect({ id: anggota.id, name: anggota.name });
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
