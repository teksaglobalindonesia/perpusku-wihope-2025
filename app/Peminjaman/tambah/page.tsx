"use client";

import { Navbar } from "@/components/custom/navbar";
import { Footer } from "@/components/custom/footer";
import { SubmitButton } from "@/components/custom/form/SubmitButton";
import ModalPilihBuku from "@/components/custom/modal/ModalPilihBuku";
import ModalPilihAnggota from "@/components/custom/modal/ModalPilihAnggota";
import { useState } from "react";

export default function TambahPinjamPage() {
  const [showModal, setShowModal] = useState(false);
  const [showModalAnggota, setShowModalAnggota] = useState(false);
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedAnggota, setSelectedAnggota] = useState("");

  const handleSelectBook = (title: string) => {
    setSelectedBook(title);
    setShowModal(false);
  };

  const handleSelectAnggota = (name: string) => {
    setSelectedAnggota(name);
    setShowModalAnggota(false);
  };

  return (
    <>
      <Navbar />
      <div className="bg-neutral-white h-[670px] flex flex-col justify-center items-center">
        <h1 className="text-neutral-dbrown font-bold font-inter text-[30px] mb-10">
          Tambah Peminjaman
        </h1>
        <div className="bg-white border border-neutral-300 rounded-xl shadow-lg w-full max-w-lg p-8">
          <form className="space-y-6">
            {/* BUKU */}
            <div>
              <label className="block text-sm text-neutral-dbrown font-medium mb-2">
                Buku
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={selectedBook}
                  readOnly
                  placeholder="Belum dipilih"
                  className="flex-1 px-4 py-2 border border-neutral-brown rounded text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 text-neutral-brown border border-neutral-brown rounded"
                >
                  Pilih
                </button>
              </div>
            </div>

            {/* ANGGOTA */}
            <div>
              <label className="block text-sm text-neutral-dbrown font-medium mb-2">
                Anggota
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={selectedAnggota}
                  readOnly
                  placeholder="Belum dipilih"
                  className="flex-1 px-4 py-2 border border-neutral-brown rounded text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowModalAnggota(true)}
                  className="px-4 py-2 text-neutral-brown border border-neutral-brown rounded"
                >
                  Pilih
                </button>
              </div>
            </div>

            {/* TANGGAL */}
            <div>
              <label className="block text-sm text-neutral-dbrown font-medium mb-2">
                Tanggal Peminjaman
              </label>
              <input
                type="date"
                className="w-full border border-neutral-dbrown px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* DURASI */}
            <div>
              <label className="block text-sm text-neutral-dbrown font-medium mb-2">
                Durasi Peminjaman
              </label>
              <select
                name="durasi"
                id="durasi"
                className="w-full border border-neutral-dbrown px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="1">1 Minggu</option>
                <option value="3">3 Minggu</option>
                <option value="7">7 Minggu</option>
                <option value="14">14 Minggu</option>
              </select>
            </div>

            <div className="pt-4">
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
      {showModal && (
        <ModalPilihBuku
          show={showModal}
          onClose={() => setShowModal(false)}
          onSelect={handleSelectBook}
        />
      )}
      {showModalAnggota && (
        <ModalPilihAnggota
          show={showModalAnggota}
          onClose={() => setShowModalAnggota(false)}
          onSelect={handleSelectAnggota}
        />
      )}

      <Footer />
    </>
  );
}
