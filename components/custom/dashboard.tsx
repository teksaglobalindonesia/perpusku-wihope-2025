'use client';
import next from 'next';
import { CardGambar } from './cardGambar';
import { useState } from 'react';
import React from 'react';

export const Dashboard = () => {
  const [curentPage, setCurentPage] = React.useState(1);
  const totalPage = 10;
  return (
    <div className="mt-20 flex flex-col gap-4 rounded-2xl border border-beige-300 bg-beige-50 px-4 py-4 shadow-lg shadow-beige-200/50">
      {/* Header Section */}
      <div className="flex justify-between gap-2">
        <h3 className="font-vintage text-3xl font-semibold text-vintage-brown">Buku stok habis</h3>
        <input
          type="text"
          placeholder="Search..."
          className="w-48 rounded-sm border-2 border-beige-300 bg-beige-100 bg-opacity-70 px-4 
            py-2 font-vintage italic text-beige-700 shadow-inner transition-colors
            duration-200 placeholder-beige-400 focus:border-beige-400 
            focus:bg-white focus:outline-none"
        />
      </div>

      {/* Card Grid Section */}
      <div className="flex flex-col gap-4">
        <CardGambar
          cardItems={[
            {
              imageSrc:
                'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              title: 'Judul Buku',
              genre: 'Genre Buku',
              author: 'Pengarang Buku',
              stock: 0
            },
            {
              imageSrc:
                'https://images.unsplash.com/photo-1633477189729-9290b3261d0a?q=80&w=1022&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              title: 'Judul Buku 2',
              genre: 'Genre Buku 2',
              author: 'Pengarang Buku 2',
              stock: 0
            },
            {
              imageSrc:
                'https://images.unsplash.com/photo-1633477189729-9290b3261d0a?q=80&w=1022&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              title: 'Judul Buku 2',
              genre: 'Genre Buku 2',
              author: 'Pengarang Buku 2',
              stock: 0
            },
            {
              imageSrc:
                'https://images.unsplash.com/photo-1633477189729-9290b3261d0a?q=80&w=1022&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              title: 'Judul Buku 2',
              genre: 'Genre Buku 2',
              author: 'Pengarang Buku 2',
              stock: 0
            },
          ]}
          onEdit={(index) => console.log('Edit item', index)}
          onDelete={(index) => console.log('Delete item', index)}
        />
      </div>

      
      <div className="flex justify-center gap-2">
        <button onClick={() => setCurentPage((prev) => Math.max (prev - 1, 1))} className="rounded-md border border-beige-300 bg-beige-100 px-3 py-1 font-vintage text-beige-700 shadow-inner hover:bg-beige-200">
          Prev
        </button>
        <button className="rounded-md border border-beige-400 bg-beige-300 px-3 py-1 font-vintage text-beige-800 shadow-inner">
          {curentPage}/{totalPage}
        </button>
        <button onClick={() => setCurentPage ((next)=> Math.min (next + 1, 1))} className="rounded-md border border-beige-300 bg-beige-100 px-3 py-1 font-vintage text-beige-700 shadow-inner hover:bg-beige-200">
          Next
        </button>
      </div>
    </div>
  );
};