'use client';

import React from 'react';

const TambahAnggota = () => {
  return (
    <div className="flex min-h-[550px] w-full flex-col items-center">
      <h1 className="mb-6 mt-12 rounded-lg bg-yellow-500 px-3 py-2 text-center text-4xl font-normal text-white underline">
        Tambahkan Anggota
      </h1>
      <form>
        <div className="mb-6 grid grid-cols-2 items-center justify-center gap-y-8 rounded-lg border-2 border-black py-3 pb-8 pr-8 pt-8">
          <div className="text-center">
            <label>Nomor Anggota</label>
          </div>
          <input
            type="text"
            placeholder="Nomor Anggota"
            className="items-center rounded-md bg-slate-300 px-5 py-2"
          />
          <div className="text-center">
            <label>Nama Anggota</label>
          </div>
          <input
            type="text"
            placeholder="Nama Anggota"
            className="rounded-md bg-slate-300 px-5 py-2"
          />
          <div className="text-center">
            <label>Email</label>
          </div>
          <input
            type="email"
            placeholder="Email"
            className="rounded-md bg-slate-300 px-5 py-2"
          />
          <div className="text-center">
            <label>Alamat</label>
          </div>
          <input
            type="text"
            placeholder="Alamat"
            className="rounded-md bg-slate-300 px-5 py-2"
          />
          <div className="text-center">
            <label>No Telp</label>
          </div>
          <input
            type="Number"
            placeholder="Nomer Telp"
            className="rounded-md bg-slate-300 px-5 py-2"
          />
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded border border-blue-950 bg-blue-100 p-2">
            <img src="/next.svg" alt="" />
          </div>
          <div className="flex flex-col space-y-8">
            <button className="mx-2 my-1 rounded bg-yellow-500 px-3 py-1 text-sm font-bold text-white">
              Pilih Gambar Baru
            </button>
            <button className="mx-2 my-1 rounded bg-green-500 px-3 py-1 text-sm font-bold text-white">
              Simpan Perubahan
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default TambahAnggota;
