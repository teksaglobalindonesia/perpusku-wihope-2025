"use client";
import { useState } from "react";
import { CardPict } from "./cardpict";
import { CardSimple } from "./cardsimple";
import Pagination from "@/components/custom/pagination";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1);

              }}
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
            <button className="bg-action-success text-white font-bold text-[16px] px-3 p-2 rounded-lg">KEMBALIKAN</button>
          )}
        </div>
      ))}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </section>
  );
};
