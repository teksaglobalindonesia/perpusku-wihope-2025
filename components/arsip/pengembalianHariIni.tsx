'use client';

import React from 'react';

const PengembalianHariIni = () => {
  return (
    <div className="mb-12 ml-6 mr-6 rounded-md border border-gray-400 bg-slate-100 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold">🍹Pengembalian Hari Ini</h2>
        <input
          type="text"
          placeholder="Search..."
          className="rounded border px-3 py-1"
        />
      </div>

      <div className="space-y-4">
        {[1, 2].map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded border p-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded border border-blue-950 bg-blue-100 p-2">
                <img src="/vercel.svg" alt="" />
              </div>
              <div>
                <p className="font-semibold">Judul Buku</p>
                <p className="text-sm">Genre</p>
                <p className="text-sm">Penulis</p>
              </div>
            </div>

            <span className="rounded bg-green-500 px-3 py-1 text-sm font-bold text-white">
              Dikembalikan
            </span>
          </div>
        ))}
      </div>

      {/* <div className="mt-6 text-center text-sm text-gray-700">
        &lt; 1 2 3 ... 20 &gt;
      </div> */}
      <div className="mt-6 flex justify-center space-x-2 text-sm text-gray-700">
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

export default PengembalianHariIni;
