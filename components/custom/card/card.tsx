"use client";
import { useState } from "react";
import { CardPict } from "./cardpict";
import { CardSimple } from "./cardsimple";

export type BookData = {
  img?: string;
  title: string;
  genre?: string;
  author?: string;
  borrower?: string;
  borrowedAt?: string;
  returnAt?: string;
  status?: "HABIS" | "KEMBALIKAN";
};

type Props = {
  title: string;
  variant?: "default" | "peminjaman" | "pengembalian";
  searchable?: boolean;
  books: readonly BookData[];
};

export const Card = ({ title, variant = "default", searchable = false, books }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-tint-4 p-6 rounded-xl shadow-md mt-10 mx-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-neutral-dbrown font-bold font-inter text-[32px]">{title}</h2>
        {searchable && (
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-3 py-2 rounded text-sm"
            />
            
          </div>
        )}
      </div>

      {filteredBooks.map((book, index) => (
        <div key={index} className="bg-neutral-white flex justify-between items-center rounded-md mb-4 shadow px-6 py-4">
          {variant === "default" ? (
            <CardPict {...book} />
          ) : (
            <CardSimple {...book} />
          )}
          {book.status === "HABIS" && (
            <span className="bg-action-error text-white font-bold text-[16px] p-20 px-6 h-fit">HABIS</span>
          )}
          {book.status === "KEMBALIKAN" && (
            <span className="bg-action-success text-white font-bold text-[16px] px-3 p-20 h-fit">KEMBALIKAN</span>
          )}
        </div>
      ))}

      <div className="flex items items-center justify-center space-x-2 my-8">
        <a href="#" className="px-4 py-2 border rounded-md">&laquo;</a>
        <a href="#" className="px-2 py-2 border rounded-md bg-neutral-mbrown text-neutral-white">1</a>
        <a href="#" className="px-2 py-2 text-neutral-dbrown">2</a>
        <a href="#" className="px-2 py-2 text-neutral-dbrown">3</a>
        <a href="#" className="px-2 py-2 text-neutral-dbrown">...</a>
        <a href="#" className="px-4 py-2 border rounded-md">&raquo;</a>
      </div>
    </section>
  );
};
