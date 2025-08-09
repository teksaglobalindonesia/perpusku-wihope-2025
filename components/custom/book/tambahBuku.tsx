'use client';

import React from 'react';

const TambahBuku = () => {
  return (
    <div className="flex min-h-[550px] w-full flex-col items-center">
      <h1 className="mb-6 mt-12 rounded-lg bg-blue-900 px-3 py-2 text-center text-4xl font-normal text-white underline">
        Tambahkan Buku
      </h1>

      <form>
        <div className="mb-6 grid grid-cols-2 items-center justify-center gap-y-8 rounded-lg border-2 border-black py-3 pb-8 pr-8 pt-8">
          <div className="text-center">
            <label>Judul Buku:</label>
          </div>
          <input
            type="text"
            name="judul"
            placeholder="Judul Buku"
            className="items-center rounded-md bg-slate-300 px-5 py-2"
          />
          <div className="text-center">
            <label>Penulis:</label>
          </div>
          <input
            type="text"
            name="penulis"
            placeholder="Penulis"
            className="rounded-md bg-slate-300 px-5 py-2"
          />
          <div className="text-center">
            <label>Penerbit:</label>
          </div>
          <input
            type="text"
            name="penerbit"
            placeholder="Penerbit"
            className="rounded-md bg-slate-300 px-5 py-2"
          />
          <div className="text-center">
            <label>Tahun Terbit:</label>
          </div>
          <input
            type="text"
            name="tahun"
            placeholder="Tahun Terbit"
            className="rounded-md bg-slate-300 px-5 py-2"
          />
          <div className="text-center">
            <label>Kategori</label>
          </div>
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            className="rounded-md bg-slate-300 px-5 py-2"
          />
          <div className="text-center">
            <label>Stok Buku:</label>
          </div>
          <input
            type="number"
            name="stok"
            placeholder="Stok"
            className="rounded-md bg-slate-300 px-5 py-2"
            min="0"
          />
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded border border-blue-950 bg-blue-100 p-2">
            <img src="/next.svg" alt="Gambar Buku" />
          </div>
          <div className="flex flex-col space-y-8">
            <button
              type="button"
              className="mx-2 my-1 rounded bg-yellow-500 px-3 py-1 text-sm font-bold text-white"
            >
              Pilih Gambar Baru
            </button>
            <button
              type="submit"
              className="mx-2 my-1 rounded bg-green-500 px-3 py-1 text-sm font-bold text-white"
            >
              Simpan Buku
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TambahBuku;
