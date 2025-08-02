'use client';
import { FormEvent } from 'react';

export const B_AddBook = () => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // const formData = new FormData(e.currentTarget);

        // const bookData = {
        //     title: formData.get('title'),
        //     author: formData.get('author'),
        //     publisher: formData.get('publisher'),
        //     year: formData.get('year'),
        //     genres: formData.getAll('genre'),
        //     stock: formData.get('stock'),
        //     image: formData.get('image'),
        // };

        // console.log('Submitted Book Data:', bookData);
    };

    return (
        <div className="max-h-[80%] bg-gray-50 px-5 md:px-10 pb-16">
            <div className="mx-auto">
                {/* Header Section */}
                <div className="mb-12 w-full">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight tracking-tight mb-4">
                        TAMBAH BUKU
                    </h1>
                </div>

                {/* Form Section */}
                <div className="bg-white border-2 border-black p-8">
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Judul */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="title" className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    Judul
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Masukkan judul buku"
                                    required
                                    className="w-full h-12 px-6 bg-white border-2 border-black text-base font-medium focus:outline-none placeholder-gray-400"
                                />
                            </div>

                            {/* Penulis */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="author" className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    Penulis
                                </label>
                                <input
                                    type="text"
                                    name="author"
                                    id="author"
                                    placeholder="Masukkan nama penulis"
                                    required
                                    className="w-full h-12 px-6 bg-white border-2 border-black text-base font-medium focus:outline-none placeholder-gray-400"
                                />
                            </div>

                            {/* Penerbit */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="publisher" className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    Penerbit
                                </label>
                                <input
                                    type="text"
                                    name="publisher"
                                    id="publisher"
                                    placeholder="Masukkan nama penerbit"
                                    className="w-full h-12 px-6 bg-white border-2 border-black text-base font-medium focus:outline-none placeholder-gray-400"
                                />
                            </div>

                            {/* Tahun */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="year" className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    Tahun Terbit
                                </label>
                                <input
                                    type="number"
                                    name="year"
                                    id="year"
                                    placeholder="2024"
                                    className="w-full h-12 px-6 bg-white border-2 border-black text-base font-medium focus:outline-none placeholder-gray-400"
                                />
                            </div>
                        </div>

                        {/* Genre */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                                Kategori
                            </label> <br />
                            <button
                                type="button"
                                className="bg-white text-black border-2 border-black px-6 py-3 text-sm font-bold tracking-wider hover:bg-black hover:text-white transition-colors duration-300"
                            >
                                TAMBAH KATEGORI
                            </button>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                                {['Fiksi', 'Romance', 'Action', 'School'].map((genre) => (
                                    <div className="flex items-center gap-3" key={genre}>
                                        <input
                                            type="checkbox"
                                            name="genre"
                                            value={genre}
                                            className="w-5 h-5 text-black border-2 border-black focus:ring-0 focus:ring-offset-0"
                                        />
                                        <label className="text-sm text-gray-700 font-medium cursor-pointer">{genre}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stok dan Gambar */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="stock" className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    Stok
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    id="stock"
                                    placeholder="0"
                                    className="w-full h-12 px-6 bg-white border-2 border-black text-base font-medium focus:outline-none placeholder-gray-400"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="image" className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    Gambar Cover
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    accept="image/*"
                                    className="w-full h-12 bg-white border-2 border-black focus:outline-none text-sm font-medium file:mr-4 file:h-full file:px-4 file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-black hover:file:bg-gray-200"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end pt-6 border-t border-black">
                            <button
                                type="submit"
                                className="bg-black text-white px-8 py-3 text-sm font-bold tracking-wider hover:bg-gray-800 transition-colors duration-300"
                            >
                                SIMPAN BUKU
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};