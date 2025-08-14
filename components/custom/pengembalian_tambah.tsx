"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";

type Item = {
  documentId?: string;
  title?: string;
  writer?: string;
  name?: string;
  id_member?: number;
  email?: string;
  cover?: {
    url?: string;
  };
  type?: "loan";
};

export const Tah_pengembali = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"loan" | null>(null);
  const [selectedLoan, setSelectedLoan] = useState<Item | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [tanggalKembali, setTanggalKembali] = useState("");
  const itemsPerPage = 2;

  useEffect(() => {
  const fetchData = async () => {
    try {
      const searchQuery = encodeURIComponent(searchTerm);

      const [resLoan, resBook, resMember] = await Promise.all([
        fetch(
          `${BASE_URL}/api/loan/list?page=${currentPage}&page_size=${itemsPerPage}&search=${searchQuery}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: TOKEN,
              "x-wihope-name": WIHOPE_NAME,
            },
            cache: "no-store",
          }
        ),
        fetch(`${BASE_URL}/api/book/list`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: TOKEN,
            "x-wihope-name": WIHOPE_NAME,
          },
          cache: "no-store",
        }),
        fetch(`${BASE_URL}/api/member/list`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: TOKEN,
            "x-wihope-name": WIHOPE_NAME,
          },
          cache: "no-store",
        }),
      ]);

      const loanJson = await resLoan.json();
      const bookJson = await resBook.json();
      const memberJson = await resMember.json();

      const bookMap = new Map<string, any>();
      bookJson?.data?.forEach((book: any) => {
        bookMap.set(book.documentId, book);
      });

      const memberMap = new Map<string, any>();
      memberJson?.data?.forEach((member: any) => {
        memberMap.set(member.documentId, member);
      });

      const dataLoan =
        loanJson?.data
          ?.filter((b: any) => b.return === null)
          .map((b: any) => {
            const bookDetail = bookMap.get(b.book?.documentId);
            const memberDetail = memberMap.get(b.member?.documentId);

            return {
              ...b,
              title: bookDetail?.title || b.book?.title || "",
              writer: bookDetail?.writer || b.book?.writer || "",
              cover: { url: bookDetail?.cover?.url || "" },
              categories: bookDetail?.categories || [],
              id_member: memberDetail?.id_member || "",
              name: memberDetail?.name || "",
              email: memberDetail?.email || "",
              type: "loan",
            };
          }) ?? [];

      setItems(dataLoan);

      const pagination = loanJson?.meta?.pagination;
      if (pagination?.page_count) {
        setTotalPages(pagination.page_count);
      } else if (pagination?.total && pagination?.page_size) {
        setTotalPages(Math.ceil(pagination.total / pagination.page_size));
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  fetchData();
}, [searchTerm, currentPage, modalType]);

  const bukaModal = (type: "loan") => {
    setModalType(type);
    setShowModal(true);
  };

  const pilihItem = (item: Item) => {
    if (modalType === "loan") setSelectedLoan(item);
    setShowModal(false);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filteredItems = useMemo(() => {
  if (!modalType) return items;
  return items.filter((item) => item.type === modalType);
}, [items, modalType]);


  const paginatedItems = useMemo(() => filteredItems, [filteredItems]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLoan || !tanggalKembali) {
      alert("Lengkapi semua data terlebih dahulu!");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/return/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
          "x-wihope-name": WIHOPE_NAME,
        },
        body: JSON.stringify({
          data: {
            loan: selectedLoan.documentId,
            actual_return_date: tanggalKembali,
          },
        }),
        cache: "no-store",
      });

      const result = await res.json();
      if (res.ok) {
        alert("Pengembalian berhasil disimpan!");
        setSelectedLoan(null);
        setTanggalKembali("");
      } else {
        alert(result.message || "Gagal menyimpan pengembalian");
      }
    } catch (error) {
      console.error("Gagal menyimpan pengembalian:", error);
    }
  };

  return (
    <>
      {showModal && modalType && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-lg max-h-[90vh] overflow-auto relative">
            <h2 className="text-lg font-semibold mb-4 capitalize">
              Pilih {modalType}
            </h2>
            <div className="flex items-center bg-white px-3 py-1 rounded text-black w-full sm:w-auto mb-3">
              🔍
              <input
                type="text"
                placeholder="Pencarian..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="ml-2 bg-transparent outline-none placeholder-black w-full sm:w-[150px]"
              />
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-500 text-xl"
            >
              &times;
            </button>

            {paginatedItems.map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg mb-3 shadow-sm hover:bg-gray-200 cursor-pointer flex gap-4"
                onClick={() => pilihItem(item)}
              >
                <Image
                  src={
                    item.cover?.url ? BASE_URL + item.cover.url : "/coverbook.jpg"
                  }
                  alt="book cover"
                  width={60}
                  height={70}
                  className="rounded"
                />
                <div>
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.id_member}</p>
                  <p className="text-sm text-gray-600">{item.email}</p>
                  <p className="text-sm text-gray-600">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.writer}</p>
                </div>
              </div>
            ))}

            <div className="flex justify-center gap-2 mt-6 flex-wrap px-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
              >
                &lt;
              </button>

              {[...Array(3)].map((_, index) => {
                const page = currentPage + index;
                if (page > totalPages) return null;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded ${
                      currentPage === page
                        ? "bg-[#5bbd87] text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-[#000000] mb-8 pb-4">
          ✏️ Tambah Pengembalian
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="loan"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Loan
            </label>
            <input
              type="text"
              id="loan"
              value={selectedLoan?.title || ""}
              onClick={() => bukaModal("loan")}
              readOnly
              placeholder="Pilih Loan"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#5bbd87] focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="tanggal"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tanggal Pengembalian
            </label>
            <input
              type="date"
              id="tanggal"
              value={tanggalKembali}
              onChange={(e) => setTanggalKembali(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#5bbd87] focus:outline-none"
              required
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="bg-[#5bbd87] text-white px-5 py-2 rounded-lg shadow hover:bg-[#4a996d] transition"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
