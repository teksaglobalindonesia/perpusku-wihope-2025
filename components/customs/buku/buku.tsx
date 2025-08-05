"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBook from "../search/search_buku";
import Pagination from "../pagination/pagination";

interface Book {
  id: number;
  title: string;
  cover?: { url: string };
  categories?: { name: string }[];
  writer: string;
  stock: number;
}

export default function ListBuku({ books }: { books: any[] }) {
  const API = "https://cms-perpusku.widhimp.my.id";

  const [currentPage, setCurrentPage] = useState(1);
  const [munculPopup, setMunculPopup] = useState(false);
  const [filterBooks, setFilterBooks] = useState<Book[]>(books);

  const itemsPerPage = 5;

  const totalPages = Math.ceil(filterBooks.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterBooks]);

  return (
    <>
      <div className="w-full bg-[#FFEAC5] px-4 md:px-[64px] py-6 md:py-[40px]">
        <div className="w-full px-2 md:px-3 py-3 md:py-5">
          <div className="md:flex md:items-center md:justify-between font-morrisroman">
            <h1 className="text-2xl md:text-3xl font-semibold">
              Books
            </h1>
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-3 md:mt-0">
              <SearchBook onSearch={(result) => {
                  setFilterBooks(result.length ? result : books);
                }} 
              />
              <Link
                href="/buku/tambah_buku"
                className="px-4 md:px-8 py-4 clip-custom text-sm md:text-lg font-cyrodiil 
                text-white font-semibold bg-green-500 text-center"
              >
                Add
              </Link>
            </div>
          </div>
          {filterBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((book) => {
            return (
              <div
                key={book.id}
                className="w-full md:flex md:items-center md:justify-between border-2 
                md:border-4 rounded-md p-3 md:p-4 mt-3 md:mt-5"
              >
                <div className="flex flex-col md:flex-row md:gap-7">
                  <div className="relative w-12 h-12 md:w-16 md:h-16 mb-2 md:mb-0">
                    <Image src={book.cover ? API + book.cover.url : "/idk"} alt={book.title} fill quality={100} className="object-contain"/>
                  </div>
                  <div className="text-sm md:text-lg font-cyrodiil">
                    <h1 className="font-semibold md:line-clamp-none line-clamp-1">
                      {book.title}
                    </h1>
                    <h2 className="md:line-clamp-none line-clamp-1">
                      {book.categories?.[0]?.name ?? null}
                    </h2>
                    <h3 className="md:line-clamp-none line-clamp-1">
                      by {book.writer}
                    </h3>
                    <div className="flex gap-2 md:gap-3 mt-2">
                      <Link
                        href={`/buku/edit_buku`}
                        className="bg-yellow-400 px-4 py-1 md:px-8 clip-custom text-xs md:text-base"
                      >
                        Edit
                      </Link>
                      <button
                        className="bg-red-400 px-4 py-1 md:px-8 clip-custom text-xs md:text-base"
                        onClick={() => setMunculPopup(true)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                {book.stock === 0 ? (
                  <div className="mt-2 md:mt-0 md:ml-auto bg-red-600 text-white px-3 
                  md:px-4 py-1 md:py-2 clip-custom text-sm md:text-lg font-cyrodiil w-full md:w-auto text-center">
                    Unavailable
                  </div>
                ) : (
                  <h1 className="mt-2 md:mt-0 md:ml-auto text-sm md:text-lg font-morrisroman">
                    Stok: {book.stock}
                  </h1>
                )}
              </div>
            );
          })}
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages}
            onPageChange={(newPage) => setCurrentPage(newPage)}
          />
        </div>
      </div>
      {munculPopup && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center 
        justify-center bg-[#F2C078] w-[90%] md:w-[500px] h-auto md:h-[142px] p-4 md:p-0 rounded-xl shadow-lg">
          <div className="w-full md:w-64 font-cyrodiil">
            <h1 className="text-lg md:text-xl text-center md:text-left">
              Are you sure you want to delete this book?
            </h1>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-5 justify-center 
            md:justify-start mt-4 text-base md:text-lg">
              <button className="bg-red-500 px-4 md:px-8 py-2 clip-custom">
                DELETE
              </button>
              <button className="border-2 rounded-md px-3 py-2" onClick={() => setMunculPopup(false)}>
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}