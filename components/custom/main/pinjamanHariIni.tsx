'use client';

import React from 'react';

const PinjamanHariIni = () => {
  return (
    <div className="mb-12 ml-6 mr-6 rounded-md border border-gray-400 bg-slate-100 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold">🔥Pinjaman Hari Ini</h2>
        <input
          type="text"
          name=""
          id=""
          placeholder="Search..."
          className="rounded border px-3 py-1"
        />
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((item, index) => (
          <div key={index} className="flex items-center rounded border p-4">
            <div className="flex flex-col items-start gap-4 pl-2">
              <h1 className="text-xl font-bold">
                Cara Memelihara Kelinci Gemoy
              </h1>
              <p>Peminjam: Alvin</p>
              <p>Peminjaman: 27-07-2025</p>
              <p>Pengembalian: 14-08-2025</p>
            </div>
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

export default PinjamanHariIni;
