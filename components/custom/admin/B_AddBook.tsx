'use client';

import { useState, useEffect } from 'react';
import { BASE_URL, NAME, TOKEN } from "@/lib/api";
import { Category } from '@/type/api-response';


export const B_AddBook = () => {
    const [title, setTitle] = useState('');
    const [writer, setWriter] = useState('');
    const [publisher, setPublisher] = useState('');
    const [publishedYear, setPublishedYear] = useState('');
    const [stock, setStock] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/book-category/list?page_size=10000`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: TOKEN,
                    'x-wihope-name': NAME,
                },
                cache: 'no-store',
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText} - ${errorText}`);
            }

            const data = await res.json();
            console.log('Categories response:', data); 

            const categoriesData: Category[] = Array.isArray(data.data) ? data.data : [];
            if (!categoriesData.every((cat: any) => cat.documentId && cat.name)) {
                console.warn('Invalid category data format:', categoriesData);
            }

            setCategories(categoriesData);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching categories';
            console.error('Fetch categories error:', err);
            setError(errorMessage);
        }
    };

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) {
            setError('Category name cannot be empty');
            return;
        }
        try {
            const res = await fetch(`${BASE_URL}/api/book-category/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: TOKEN,
                    'x-wihope-name': NAME,
                },
                body: JSON.stringify({ data: { name: newCategoryName } }),
                cache: 'no-store',
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Failed to add category: ${res.status} ${res.statusText} - ${errorText}`);
            }

            setNewCategoryName('');
            setShowAddCategory(false);
            fetchCategories();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred while adding category';
            setError(errorMessage);
        }
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSelectedCategories(prev =>
            prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        const formData = new FormData();
        if (coverFile) {
            formData.append('cover', coverFile);
        }
        const bookData = {
            title,
            writer,
            publisher,
            published_year: publishedYear,
            stock: parseInt(stock) || 0,
            categories: selectedCategories,
        };
        formData.append('data', JSON.stringify(bookData));

        try {
            const response = await fetch(`${BASE_URL}/api/book/add`, {
                method: 'POST',
                headers: {
                    Authorization: TOKEN,
                    'x-wihope-name': NAME,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to add book: ${response.status} ${response.statusText} - ${errorText}`);
            }

            setSuccess(true);
            setTitle('');
            setWriter('');
            setPublisher('');
            setPublishedYear('');
            setStock('');
            setSelectedCategories([]);
            setCoverFile(null);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred while adding book';
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
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
                    {error && (
                        <div className="mb-4 p-4 bg-red-100 text-red-700">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 p-4 bg-green-100 text-green-700">
                            Book added successfully!
                        </div>
                    )}
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
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
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
                                    value={writer}
                                    onChange={(e) => setWriter(e.target.value)}
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
                                    value={publisher}
                                    onChange={(e) => setPublisher(e.target.value)}
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
                                    value={publishedYear}
                                    onChange={(e) => setPublishedYear(e.target.value)}
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
                                onClick={() => setShowAddCategory(true)}
                                className="bg-white text-black border-2 border-black px-6 py-3 text-sm font-bold tracking-wider hover:bg-black hover:text-white transition-colors duration-300"
                            >
                                TAMBAH KATEGORI
                            </button>
                            {showAddCategory && (
                                <div className="mt-4 flex gap-2">
                                    <input
                                        type="text"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        placeholder="Enter new category name"
                                        className="w-full h-12 px-6 bg-white border-2 border-black text-base font-medium focus:outline-none placeholder-gray-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddCategory}
                                        className="bg-black text-white px-4 py-2 text-sm font-bold tracking-wider"
                                    >
                                        SIMPAN
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowAddCategory(false)}
                                        className="bg-white text-black px-4 py-2 text-sm font-bold tracking-wider hover:bg-black hover:text-white border-2 border-black duration-300 transsition-all"
                                    >
                                        BATAL
                                    </button>
                                </div>
                            )}
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                                {categories.length > 0 ? (
                                    categories.map((cat) => (
                                        <div className="flex items-center gap-3" key={cat.documentId}>
                                            <input
                                                type="checkbox"
                                                name="genre"
                                                value={cat.documentId}
                                                checked={selectedCategories.includes(cat.documentId)}
                                                onChange={handleCategoryChange}
                                                className="w-5 h-5 text-black border-2 border-black focus:ring-0 focus:ring-offset-0"
                                            />
                                            <label className="text-sm text-gray-700 font-medium cursor-pointer">{cat.name}</label>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">No categories available</p>
                                )}
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
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
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
                                    onChange={(e) => setCoverFile(e.target.files ? e.target.files[0] : null)}
                                    className="w-full h-12 bg-white border-2 border-black focus:outline-none text-sm font-medium file:mr-4 file:h-full file:px-4 file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-black hover:file:bg-gray-200"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end pt-6 border-t border-black">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`bg-black text-white px-8 py-3 text-sm font-bold tracking-wider transition-colors duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? 'SAVING...' : 'SIMPAN BUKU'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};