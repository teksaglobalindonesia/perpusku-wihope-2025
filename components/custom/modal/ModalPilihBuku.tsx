"use client";

import Image from "next/image";
import Pagination from "@/components/custom/pagination";

const dummyBooks = [
  {
    img: "/aset/Aroma Karsa.jpg",
    title: "Aroma Karsa",
    genre: "Adventure, romance, mystery",
    author: "Dee Lestari",
    stock: 2,
  },
  {
    img: "/aset/Bumi Manusia.jpg",
    title: "Bumi Manusia",
    genre: "Romance, historical",
    author: "Pramoedya Ananta Toer",
    stock: 1,
  },
  {
    img: "/aset/Negeri 5 Menara.jpg",
    title: "Negeri 5 Menara",
    genre: "Inspirational",
    author: "A. Fuadi",
    stock: 2,
  },
  {
    img: "/aset/Gadis Kretek.jpg",
    title: "Gadis Kretek",
    genre: "Romance, drama",
    author: "Ratih Kumala",
    stock: 1,
  },
];

export default function ModalPilihBuku({ show, onClose, onSelect }: {
  show: boolean;
  onClose: () => void;
  onSelect: (title: string) => void;
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
      <div className="bg-neutral-white rounded-lg w-[600px] shadow-lg border border-neutral-300">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-neutral-dbrown">Pilih Buku</h2>
          <button onClick={onClose} className="text-xl">&times;</button>
        </div>
        <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
          {dummyBooks.map((book, index) => (
            <div key={index} className="bg-neutral-100 rounded-lg p-3 flex justify-between items-center">
              <div className="flex gap-4">
                <Image src={book.img} alt={book.title} width={50} height={50} className="rounded" />
                <div>
                  <h3 className="text-sm font-bold">{book.title}</h3>
                  <p className="text-xs">{book.genre}<br />{book.author}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs mb-2">Stok: {book.stock}</span>
                <button
                  className="bg-action-success text-neutral-white text-xs px-3 py-1 rounded"
                  onClick={() => onSelect(book.title)}
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
