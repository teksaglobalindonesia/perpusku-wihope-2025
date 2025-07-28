"use client";

import { useState } from "react";

const dummyAnggota = [
  {
    name: "Dee Lestari",
    noAnggota: "001",
    email: "dee.lestari@example.com",
  },
  {
    name: "Justine Bieber",
    noAnggota: "002",
    email: "justine.bieber@example.com",
  },
  {
    name: "Cristine Aguilera",
    noAnggota: "003",
    email: "cristine.aguilera@example.com",
  },
  {
    name: "Agus Salim",
    noAnggota: "004",
    email: "agus.salim@example.com",
  },
  {
    name: "Budi Santoso",
    noAnggota: "005",
    email: "budi.santoso@example.com",
  },
  {
    name: "Ratih Kumala",
    noAnggota: "006",
    email: "ratih.kumala@example.com",
  },
];

export default function ModalPilihBuku({ show, onClose, onSelect }: {
  show: boolean;
  onClose: () => void;
  onSelect: (anggota: string) => void;
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
      <div className="bg-neutral-white rounded-lg w-[600px] shadow-lg border border-neutral-300 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-neutral-dbrown">Pilih Anggota</h2>
          <button onClick={onClose} className="text-xl">&times;</button>
        </div>
        <div className="p-4 space-y-4 flex-1 overflow-y-auto">
          {dummyAnggota.map((anggota, index) => (
            <div
              key={index}
              className="bg-neutral-100 rounded-lg p-3 flex justify-between items-center"
            >
              <div>
                <h3 className="text-sm font-bold">{anggota.name}</h3>
                <p className="text-xs">
                  {anggota.noAnggota}<br />
                  {anggota.email}
                </p>
              </div>
              <div className="flex items-center">
                <button
                  className="bg-action-success text-neutral-white text-xs px-3 py-1 rounded"
                  onClick={() => onSelect(anggota.name)}
                >
                  PILIH
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items items-center justify-center space-x-2 my-8">
          <a href="#" className="px-4 py-2 border rounded-md">&laquo;</a>
          <a href="#" className="px-2 py-2 border rounded-md bg-neutral-mbrown text-neutral-white">1</a>
          <a href="#" className="px-2 py-2 text-neutral-dbrown">2</a>
          <a href="#" className="px-2 py-2 text-neutral-dbrown">3</a>
          <a href="#" className="px-2 py-2 text-neutral-dbrown">...</a>
          <a href="#" className="px-4 py-2 border rounded-md">&raquo;</a>
        </div>
      </div>
    </div>
  );
}
