// INI GA DIPAKAI, CUMA JADI ARSIP
'use client';

import React from 'react';

const Dashboard = () => {
  return (
    <div className="bg-slate-100 p-6">
      {/* buku habis */}
      <h1 className="mb-4 ml-6 text-xl font-bold underline">Dashboard</h1>
      <div className="mb-12 rounded-md border border-black p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Buku Stok Habis</h2>
          <input
            type="text"
            placeholder="Search..."
            className="rounded border px-3 py-1"
          />
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded border p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded bg-blue-100">
                  📘
                </div>
                <div>
                  <p className="font-semibold">Judul Buku</p>
                  <p className="text-sm">Genre</p>
                  <p className="text-sm">Penulis</p>
                </div>
              </div>

              <span className="rounded bg-red-500 px-3 py-1 text-sm font-bold text-white">
                HABIS
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-sm text-gray-700">
          &lt; 1 2 3 ... 20 &gt;
        </div>
      </div>

      {/* Pinjaman hari ini */}
      <div className="mb-12 rounded-md border border-gray-400 p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Pinjaman Hari Ini</h2>
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
        <div className="mt-6 text-center text-sm text-gray-700">
          &lt; 1 2 3 ... 20 &gt;
        </div>
      </div>

      {/* Pengembalian Hari Ini */}
      <div className="mb-12 rounded-md border border-gray-400 p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Pengembalian Hari Ini</h2>
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
                <div className="flex h-12 w-12 items-center justify-center rounded bg-blue-100">
                  📘
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

        <div className="mt-6 text-center text-sm text-gray-700">
          &lt; 1 2 3 ... 20 &gt;
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

{
  // formulir lama
  /* <div className="flex max-w-lg flex-row rounded-md border-2 border-black p-6">
          <div className="flex h-full flex-col">
            <label>
              Judul Buku:
              <input
                type="text"
                placeholder="Judul Buku"
                className=" m-4 rounded-md bg-slate-300 px-3 py-1"
              />
            </label>
            <label>
              Penulis:
              <input
                type="text"
                placeholder="Penulis"
                className=" m-4 rounded-md bg-slate-300 px-3 py-1"
              />
            </label>
            <label>
              Penerbit:
              <input
                type="text"
                placeholder="Penerbit"
                className=" m-4 rounded-md bg-slate-300 px-3 py-1"
              />
            </label>
            <label>
              Tahun Terbit:
              <input
                type="text"
                placeholder="Tahun Terbit"
                className=" m-4 rounded-md bg-slate-300 px-3 py-1"
              />
            </label>
            <label className="mb-4 block">
              Kategori:
              <select className="mt-1 block w-full rounded-md bg-slate-300 px-3 py-1">
                <option value="">Pilih Kategori</option>
                <option value="fiksi">Fiksi</option>
                <option value="non-fiksi">Non-Fiksi</option>
                <option value="komik">Komik</option>
                <option value="biografi">Biografi</option>
              </select>
            </label>

            <label>
              Stok
              <input
                type="text"
                placeholder="Stok Buku"
                className=" m-4 rounded-md bg-slate-300 px-3 py-1"
              />
            </label>
          </div>
          <label>
            Tahun Terbit:
            <input
              type="text"
              placeholder="Tahun Terbit"
              className=" m-4 rounded-md bg-slate-300 px-3 py-1"
            />
          </label>
        </div> */
}

// anggota lama
// return (
//   <div className="min-h-[540px] w-full bg-yellow-200">
//     <h1 className="p-4 text-center text-3xl font-light underline">
//       List Anggota Perpusku
//     </h1>
//     <div className="p-4">
//       <h2 className="mb-4 text-2xl font-bold">Daftar Anggota</h2>
//       <table className="min-w-full table-auto border-collapse border border-black">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="border border-black px-4 py-2 text-left">No</th>
//             <th className="border border-black px-4 py-2 text-left">Nama</th>
//             <th className="border border-black px-4 py-2 text-left">Email</th>
//             <th className="border border-black px-4 py-2 text-left">
//               Status
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {[
//             {
//               nama: 'Alvin Nugraha',
//               email: 'alvin@example.com',
//               status: 'Aktif'
//             },
//             {
//               nama: 'Budi Santoso',
//               email: 'budi@example.com',
//               status: 'Nonaktif'
//             },
//             {
//               nama: 'Citra Dewi',
//               email: 'citra@example.com',
//               status: 'Aktif'
//             }
//           ].map((anggota, index) => (
//             <tr key={index} className="hover:bg-gray-50">
//               <td className="border border-black px-4 py-2">{index + 1}</td>
//               <td className="border border-black px-4 py-2">
//                 {anggota.nama}
//               </td>
//               <td className="border border-black px-4 py-2">
//                 {anggota.email}
//               </td>
//               <td className="border border-black px-4 py-2">
//                 {anggota.status}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// );
