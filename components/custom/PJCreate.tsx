'use client';
import { useState } from 'react';
import { CardGambar } from '@/components/custom/cardGambar';
import { MembersCard } from './MCard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

export const PJCreate = () => {
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const bookData = [
    {
      imageSrc:
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      title: 'The Great Adventure',
      genre: 'Petualangan',
      author: 'Jhon Explorer',
      stock: 5,
      buttons: []
    }
  ];

  const memberData = [
    {
      name: 'John Doe',
      UID: 12345,
      email: 'john.doe@example.com',
      buttons: []
    }
  ];

  const handleSelectedBook = (index: number) => {
    setSelectedBook(bookData[index].title);
  };
  const handleSelectedMember = (index: number) => {
    setSelectedMember(memberData[index].name);
  };
  return (
    <div className="flex flex-col gap-5 bg-vintage-pparchment p-6 border border-vintage-brown/20 rounded-lg shadow-sm">
      <h1 className="border-b border-vintage-brown/30 pb-2 font-vintage text-3xl font-semibold text-vintage-ink">
        Tambah Peminjaman
      </h1>
      <form className="grid grid-flow-row grid-cols-2 gap-4 rounded-xl bg-beige-200 p-5 border border-vintage-brown/30 shadow-inner">
        <div className="flex flex-col gap-2">
          <label className="font-vintage font-medium text-vintage-ink/80">
            Buku
          </label>
          <Dialog>
            <DialogTrigger asChild>
              <input
                type="text"
                value={selectedBook}
                readOnly
                className="h-8 cursor-pointer rounded-md text-center focus:outline-vintage-parchment"
                placeholder="Pilih buku.."
              />
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] max-w-3xl overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Pilih Buku</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <CardGambar
                  cardItems={bookData}
                  onEdit={handleSelectedBook}
                  showSelectButton={true}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-vintage font-medium text-vintage-ink/80">
            Anggota
          </label>
          <Dialog>
            <DialogTrigger asChild>
              <input
                type="text"
                value={selectedMember}
                readOnly
                placeholder="Pilih Anggota"
                className="h-8 cursor-pointer rounded-md text-center focus:outline-vintage-parchment"
              />
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] max-w-3xl overflow-y-auto">
              <div className="mt-4">
                <MembersCard
                  cardItems={memberData}
                  onEdit={handleSelectedMember}
                  showSelectButton={true}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-vintage font-medium text-vintage-ink/80">
            Tanggal Peminjaman
          </label>
          <input
            type="date"
            className="h-8 rounded-md text-center focus:outline-vintage-parchment"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-vintage font-medium text-vintage-ink/80">
            Durasi Peminjaman
          </label>
          <div className="relative">
            <select
              className="w-full cursor-pointer appearance-none rounded-md border border-vintage-brown/40 bg-beige-50 px-3 
                py-1.5 text-vintage-ink shadow-inner focus:border-vintage-terracotta/70
                focus:outline-none focus:ring-1 focus:ring-vintage-terracotta/50"
            >
              <option className="bg-beige-100 hover:bg-vintage-terracotta/20">
                1 minggu
              </option>
              <option className="bg-beige-100 hover:bg-vintage-terracotta/20">
                2 minggu
              </option>
              <option className="bg-beige-100 hover:bg-vintage-terracotta/20">
                3 minggu
              </option>
              <option className="bg-beige-100 hover:bg-vintage-terracotta/20">
                4 minggu
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-vintage-brown/60">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </form>
      <button
        type="submit"
        className="w-48 rounded-md border border-vintage-terracotta bg-vintage-terracotta px-4 py-2 text-sm font-medium text-beige-50 
             shadow-md transition-all duration-200 hover:bg-vintage-terracotta/90 hover:shadow-inner
             focus:outline-none focus:ring-2 focus:ring-vintage-terracotta/50 focus:ring-offset-1 focus:ring-offset-beige-200
             active:translate-y-0.5 active:shadow-sm"
      >
        <span className="drop-shadow-sm">Simpan</span>
      </button>
    </div>
  );
};
