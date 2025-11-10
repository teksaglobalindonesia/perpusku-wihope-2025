"use client";

import { id } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link'; 
import { title } from 'process';
import { useState } from 'react';

export const BukuHero = () => {
const books = [
  {
    id: 1,
    title: 'Kekasih Impian',
    genre: 'Romance',
    penulis: 'Penulis 1',
    stock: 2

  },
  {
    id: 2,
    title: 'Kekasih Impian',
    genre: 'Romance',
    penulis: 'Penulis 2',
    stock: 1
    
  },
  {
    id: 3,
    title: 'Kekasih Impian',
    genre: 'Romance',
    penulis: 'Penulis 3',
    stock: 0
    
  },
  {
    id: 4,
    title: 'Kekasih Impian',
    genre: 'Romance',
    penulis: 'Penulis 4',
    stock: 2
    
  }

]

const [show, setShow] = useState(false);

  return (
    <div className="h-[550px] w-full gap-4 p-6">
      <div className="w-full rounded p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-[25px] font-semibold">Buku</h1>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="rounded-md border border-gray-400 px-4 py-2 focus:outline-none"
            />
             <Link href="/buku/tambah">
            <button className="rounded-md bg-green-400 px-4 py-2">
              TAMBAH
            </button>
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          {books.map((book) => (
            <div key={book.id} className="flex items-center gap-4 rounded border bg-white p-4 shadow-sm">
            <div className="overflow-hidden rounded">
              <Image
                src="/asset/Kekasih-impian.jpg"
                alt="Kekasih Impian"
                width={100}
                height={100}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col">
              <strong className="font-semibold">{book.title}</strong>
              <span>{book.genre}</span>
              <span>{book.penulis}</span>
              <div className="flex gap-2">
                 <Link href="/buku/edit">
                <button className="rounded px-4 py-1 bg-yellow-400 ">Edit</button>
                </Link>
                <button className="rounded px-4 py-1 bg-red-500" onClick={() => setShow(true)}>Hapus</button>
              </div>
            </div>
            <div>
              {book.stock === 0 ? (
                <span className="rounded bg-red-600 px-6 py-3 text-sm text-white">
                  HABIS
                </span>
              ) : (
                <span className="rounded bg-green-600 px-6 py-3 text-sm text-white">
                  Stock: {book.stock}
                </span>
              )}
            </div>
          </div>
          ))}
          {show && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
                <p>Apakah Anda yakin ingin menghapus buku ini?</p>
                <div className="mt-4 flex justify-end gap-2">
                  <button className="rounded bg-gray-300 px-4 py-2" onClick={() => setShow(false)}>Batal</button>
                  <button className="rounded bg-red-500 px-4 py-2 text-white">Hapus</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
