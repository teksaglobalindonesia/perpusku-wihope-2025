"use client";
import { Card } from "@/components/custom/card/card";

const Dashboard = () => {
  const bukuHabis = [
    {
      title: "Milea: Suara Hati Dilan",
      genre: "Roman, Komedi",
      author: "Pidi Baiq",
      img: "/aset/Milea.jpg",
      status: "HABIS",
    },
    {
      title: "Laskar Pelangi",
      genre: "Roman, Komedi",
      author: "Andrea Hirata",
      img: "/aset/LaskarPelangi.jpg",
      status: "HABIS",
    },
  ] as const;

  const dataPeminjaman = [
    {
      title: "Buku Cara Jadi Fullstack Dalam 1 Hari",
      borrower: "Widhi",
      borrowedAt: "17 Juli 2025, 08.00",
      returnAt: "24 Juli 2025",
    },

    {
      title: "Cara Menghasilkan Dollar dari Youtube",
      borrower: "Samsul",
      borrowedAt: "17 Juli 2025, 09.00",
      returnAt: "31 Juli 2025",
    },
  ];

  const dataPengembalian = [
    {
      title: "Kisi Kisi Frontend",
      borrower: "Charly",
      borrowedAt: "10 Juli 2025, 08.00",
      returnAt: "17 Juli 2025",
      status: "KEMBALIKAN",
    },

    {
      title: "Kisi Kisi Backend",
      borrower: "Berly",
      borrowedAt: "10 Juli 2025, 08.00",
      returnAt: "17 Juli 2025",
      status: "KEMBALIKAN",
    },
  ] as const;

  return (
    <>
      <Card title="Buku Stok Habis" variant="default" searchable books={bukuHabis} />
      <Card title="Data Peminjaman" variant="peminjaman" searchable books={dataPeminjaman} />
      <Card title="Data Pengembalian" variant="pengembalian" searchable books={dataPengembalian} />
    </>
  );
};

export default Dashboard;
