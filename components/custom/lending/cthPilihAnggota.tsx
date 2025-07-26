'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Member = [
  { nama: 'Joh', noAnggota: '12345', email: 'john@yahodie.com' },
  { nama: 'Jane', noAnggota: '67890', email: 'jennie@gmail.com' },
  { nama: 'Doe', noAnggota: '54321', email: 'dodo@gmail.com' }
];
const CthPilihAnggota = () => {
  return (
    <div className="min-h-[540px] w-full">
      <div className="mt-6 flex flex-row justify-between p-4 px-9 font-light">
        <h1 className="ml-12 rounded-lg bg-purple-400 px-3 py-1 text-3xl">
          <span className="font-normal text-yellow-900 underline">
            Pilih Anggota
          </span>
        </h1>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="rounded border px-3 py-1"
          />
        </div>
      </div>

      {/* Tabel */}
      <div className="mx-8 mb-8 rounded-md p-4">
        <div className="space-y-4">
          {Member.map((item) => (
            <div
              key={item.noAnggota}
              className="flex items-center justify-between rounded border p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded border border-blue-950 bg-blue-100 p-2">
                  <img src="/next.svg" alt="" />
                </div>
                <div>
                  <p className="font-semibold">{item.nama}</p>
                  <p className="text-sm">{item.noAnggota}</p>
                  <p className="text-sm">{item.email}</p>

                  <button className="my-1 mr-1 rounded bg-purple-500 px-3 py-1 text-sm font-bold text-white">
                    Pilih
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6 mt-6 flex justify-center space-x-2 text-sm text-gray-700">
        {['<', 1, 2, '...', 20, '>'].map((item, index) => (
          <div
            key={index}
            className="cursor-pointer rounded-md border px-3 py-1 hover:bg-gray-200"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CthPilihAnggota;
