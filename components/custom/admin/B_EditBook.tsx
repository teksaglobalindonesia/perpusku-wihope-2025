'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { BASE_URL, NAME, TOKEN } from "@/lib/api";

interface Category {
    id: number;
    documentId: string;
    name: string;
    createdAt: string;
}

interface Book {
    id: number;
    documentId: string;
    title: string;
    writer: string;
    publisher: string;
    published_year: string;
    stock: number;
    categories: Category[];
}

interface FormData {
    title: string;
    writer: string;
    publisher: string;
    publishedYear: string;
    stock: string;
    selectedCategories: string[];
    coverFile: File | null;
}

export default function EditBook() {
    const { documentId } = useParams();
    const id = Array.isArray(documentId) ? documentId[0] : documentId;

    const [formData, setFormData] = useState<FormData>({
        title: '',
        writer: '',
        publisher: '',
        publishedYear: '',
        stock: '',
        selectedCategories: [],
        coverFile: null,
    });
    const [categories, setCategories] = useState<Category[]>([]);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const fetchCategories = useCallback(async () => {
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
                throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
            }

            const data = await res.json();
            const categoriesData: Category[] = Array.isArray(data.data) ? data.data : [];
            if (!categoriesData.every(cat => cat.documentId && cat.name)) {
                console.warn('Invalid category data format:', categoriesData);
            }

            setCategories(categoriesData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch categories');
        }
    }, []);

    const fetchBookData = useCallback(async () => {
        if (!id) {
            setError('Invalid book ID');
            return;
        }

        try {
            // Try single-book endpoint first
            const singleRes = await fetch(`${BASE_URL}/api/book/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: TOKEN,
                    'x-wihope-name': NAME,
                },
                cache: 'no-store',
            });

            if (singleRes.ok) {
                const data = await singleRes.json();
                const book: Book = data.data;
                if (!book || !book.title || !book.writer) {
                    throw new Error('Invalid book data format');
                }
                setFormData({
                    title: book.title,
                    writer: book.writer,
                    publisher: book.publisher || '',
                    publishedYear: book.published_year || '',
                    stock: book.stock?.toString() || '0',
                    selectedCategories: book.categories?.map(cat => cat.documentId) || [],
                    coverFile: null,
                });
                return;
            }

            // Fallback to book list endpoint
            console.warn('Single book fetch failed, trying book list endpoint');
            const listRes = await fetch(`${BASE_URL}/api/book/list`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: TOKEN,
                    'x-wihope-name': NAME,
                },
                cache: 'no-store',
            });

            if (!listRes.ok) {
                throw new Error(`Failed to fetch book list: ${listRes.status} ${listRes.statusText}`);
            }

            const listData = await listRes.json();
            const books: Book[] = Array.isArray(listData.data) ? listData.data : [];
            const book = books.find(b => b.documentId === id);
            if (!book) {
                throw new Error(`Book with ID ${id} not found in list`);
            }

            setFormData({
                title: book.title,
                writer: book.writer,
                publisher: book.publisher || '',
                publishedYear: book.published_year || '',
                stock: book.stock?.toString() || '0',
                selectedCategories: book.categories?.map(cat => cat.documentId) || [],
                coverFile: null,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch book data');
        }
    }, [id]);

    useEffect(() => {
        Promise.all([fetchCategories(), fetchBookData()])
            .catch(() => setError('Failed to load initial data'))
    }, [fetchCategories, fetchBookData]);

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
                throw new Error(`Failed to add category: ${res.status} ${res.statusText}`);
            }

            setNewCategoryName('');
            setShowAddCategory(false);
            await fetchCategories();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add category');
        }
    };

    const handleCategoryChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            selectedCategories: prev.selectedCategories.includes(value)
                ? prev.selectedCategories.filter(v => v !== value)
                : [...prev.selectedCategories, value],
        }));
    };

    const handleInputChange = (field: keyof FormData, value: string | File | null) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) {
            setError('Invalid book ID');
            return;
        }

        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        const formDataPayload = new FormData();
        if (formData.coverFile) {
            formDataPayload.append('files.cover', formData.coverFile);
        }
        formDataPayload.append('documentId', id);
        formDataPayload.append('data', JSON.stringify({
            title: formData.title,
            writer: formData.writer,
            publisher: formData.publisher,
            published_year: formData.publishedYear,
            stock: parseInt(formData.stock) || 0,
            categories: formData.selectedCategories,
        }));

        try {
            const response = await fetch(`${BASE_URL}/api/book/edit`, {
                method: 'PATCH',
                headers: {
                    Authorization: TOKEN,
                    'x-wihope-name': NAME,
                },
                body: formDataPayload,
            });

            if (!response.ok) {
                throw new Error(`Failed to edit book: ${response.status} ${response.statusText}`);
            }

            setSuccess(true);
            setFormData(prev => ({ ...prev, coverFile: null }));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to edit book');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (error) {
        return (
            <div className="p-8 text-center">
                <div className="mb-4 p-4 bg-red-100 text-red-700">{error}</div>
                <button
                    onClick={() => {
                        setError(null);
                        fetchBookData();
                    }}
                    className="bg-black text-white px-8 py-3 text-sm font-bold tracking-wider"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="max-h-[80%] bg-gray-50 px-5 md:px-10 pb-16">
            <div className="mx-auto">
                <div className="mb-12 w-full">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight tracking-tight mb-4">
                        EDIT BUKU
                    </h1>
                </div>

                <div className="bg-white border-2 border-black p-8">
                    {success && (
                        <div className="mb-4 p-4 bg-green-100 text-green-700">
                            Book updated successfully!
                        </div>
                    )}
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="title" className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    Judul
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    placeholder="Masukkan judul buku"
                                    required
                                    className="w-full h-12 px-6 bg-white border-2 border-black text-base font-medium focus:outline-none placeholder-gray-400"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="author" className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    Penulis
                                </label>
                                <input
                                    type="text"
                                    name="author"
                                    id="author"
                                    value={formData.writer}
                                    onChange={(e) => handleInputChange('writer', e.target.value)}
                                    placeholder="Masukkan nama penulis"
                                    required
                                    className="w-full h-12 px-6 bg-white border-2 border-black text-base font-medium focus:outline-none placeholder-gray-400"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="publisher" className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    Penerbit
                                </label>
                                <input
                                    type="text"
                                    name="publisher"
                                    id="publisher"
                                    value={formData.publisher}
                                    onChange={(e) => handleInputChange('publisher', e.target.value)}
                                    placeholder="Masukkan nama penerbit"
                                    className="w-full h-12 px-6 bg-white border-2 border-black text-base font-medium focus:outline-none placeholder-gray-400"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="year" className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    Tahun Terbit
                                </label>
                                <input
                                    type="number"
                                    name="year"
                                    id="year"
                                    value={formData.publishedYear}
                                    onChange={(e) => handleInputChange('publishedYear', e.target.value)}
                                    placeholder="2024"
                                    className="w-full h-12 px-6 bg-white border-2 border-black text-base font-medium focus:outline-none placeholder-gray-400"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                                Kategori
                            </label>
                            <br />
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
                                        className="bg-white text-black px-4 py-2 text-sm font-bold tracking-wider hover:bg-black hover:text-white border-2 border-black duration-300 transition-all"
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
                                                checked={formData.selectedCategories.includes(cat.documentId)}
                                                onChange={() => handleCategoryChange(cat.documentId)}
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

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="stock" className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    Stok
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    id="stock"
                                    value={formData.stock}
                                    onChange={(e) => handleInputChange('stock', e.target.value)}
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
                                    onChange={(e) => handleInputChange('coverFile', e.target.files ? e.target.files[0] : null)}
                                    className="w-full h-12 bg-white border-2 border-black focus:outline-none text-sm font-medium file:mr-4 file:h-full file:px-4 file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-black hover:file:bg-gray-200"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-6 border-t border-black">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`bg-black text-white px-8 py-3 text-sm font-bold tracking-wider transition-colors duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? 'UPDATING...' : 'UPDATE BUKU'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}