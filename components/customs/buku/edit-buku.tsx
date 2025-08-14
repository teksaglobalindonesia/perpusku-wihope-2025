"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { editBook, fetchBookById } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Category {
    id: number;
    documentId: string;
    name: string;
    createdAt?: string;
}

interface BookData {
    id: number;
    documentId: string;
    title: string;
    writer: string;
    publisher: string;
    published_year: string;
    stock: number;
    cover?: {
        url: string;
    };
    categories?: Category[];
}

export default function EditBuku({ 
    categories = [],
    documentId 
}: { 
    categories?: Category[];
    documentId: string;
}) {
    const [title, setTitle] = useState("");
    const [writer, setWriter] = useState("");
    const [publisher, setPublisher] = useState("");
    const [publishedYear, setPublishedYear] = useState("");
    const [stock, setStock] = useState<number>(0);
    const [category, setCategory] = useState<string>("");
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [bookData, setBookData] = useState<BookData | null>(null);
    const [loadingData, setLoadingData] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    
    const router = useRouter();

    useEffect(() => {
        if (documentId) {
            loadBookData();
        }
    }, [documentId]);

    const loadBookData = async () => {
        try {
            setLoadingData(true);
            const data = await fetchBookById(documentId);
            setBookData(data);
            setTitle(data.title || "");
            setWriter(data.writer || "");
            setPublisher(data.publisher || "");
            setPublishedYear(data.published_year || "");
            setStock(data.stock || 0);
            if (data.categories && data.categories.length > 0) {
                setCategory(data.categories[0].documentId);
            }
        } catch (error) {
            console.error("Failed to load book data:", error);
            setPopupMessage("Failed to load book data");
            setShowPopup(true);
        } finally {
            setLoadingData(false);
        }
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        setPopupMessage("");
        if (loadingData && !bookData) {
            router.push("/buku");
        }
    };

    const handleSubmit = async () => {
        if (!documentId) {
            setPopupMessage("Document ID is required");
            setShowPopup(true);
            return;
        }

        setLoading(true);
        try {
            const bookDataToSend = {
                title,
                writer,
                publisher,
                published_year: publishedYear,
                stock,
                categories: category ? [category] : []
            };

            await editBook(documentId, coverFile, bookDataToSend);
            
            setPopupMessage("Book updated successfully!");
            setShowPopup(true);
            
            setTimeout(() => {
                router.push("/buku");
            }, 2000);
        } catch (error) {
            console.error("Failed to update book:", error);
            setPopupMessage("Failed to update book: " + (error as Error).message);
            setShowPopup(true);
        } finally {
            setLoading(false);
        }
    };

    if (loadingData) {
        return (
            <div className="w-full px-4 md:px-[64px] mt-8 md:mt-[84px] bg-[#FFEAC5] pb-6 flex justify-center items-center h-96">
                <p className="text-xl">Loading book data...</p>
            </div>
        );
    }

    return (
        <>
            <div className="w-full px-4 md:px-[64px] mt-8 md:mt-[84px] bg-[#FFEAC5] pb-6">
                <div className="w-full flex justify-center items-center py-4 md:py-8">
                    <h1 className="font-morrisroman text-2xl md:text-3xl font-semibold">
                        Edit a Book
                    </h1>
                </div>
                <div className="w-full px-4 md:px-[64px] py-4 md:py-5 bg-[#6C4E31] rounded-lg text-white font-cyrodiil text-base md:text-lg">
                    <div className="w-full px-2 md:px-4 py-2">
                        <div className="py-2">
                            <label>Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="w-full mt-2 md:mt-4 py-1 border-2 rounded-md text-black px-2"
                                placeholder="Enter book title"
                            />
                        </div>
                        <div className="py-2">
                            <label>Author</label>
                            <input
                                type="text"
                                value={writer}
                                onChange={e => setWriter(e.target.value)}
                                className="w-full mt-2 md:mt-4 py-1 border-2 rounded-md text-black px-2"
                                placeholder="Enter author name"
                            />
                        </div>
                        <div className="py-2">
                            <label>Publisher</label>
                            <input
                                type="text"
                                value={publisher}
                                onChange={e => setPublisher(e.target.value)}
                                className="w-full mt-2 md:mt-4 py-1 border-2 rounded-md text-black px-2"
                                placeholder="Enter publisher"
                            />
                        </div>
                        <div className="py-2">
                            <label>Year of Publication</label>
                            <input
                                type="number"
                                value={publishedYear}
                                onChange={e => setPublishedYear(e.target.value)}
                                className="w-full mt-2 md:mt-4 py-1 border-2 rounded-md text-black px-2"
                                placeholder="YYYY"
                                max={new Date().getFullYear()}
                            />
                        </div>
                        <div className="py-2">
                            <label className="block mb-2">Category</label>
                            <div className="mb-4">
                                <Link 
                                    href="/buku/tambah_categories" 
                                    className="px-4 bg-yellow-500 py-2 clip-custom mb-2 text-sm md:text-base inline-block"
                                >
                                    Add Category
                                </Link>
                            </div>
                            {categories.length === 0 ? (
                                <p className="text-yellow-200">No categories available</p>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full md:w-[360px]">
                                    {categories.map((cat) => (
                                        <label key={cat.documentId} className="flex items-center gap-2 text-sm md:text-base">
                                            <input
                                                type="radio"
                                                name="category"
                                                value={cat.documentId}
                                                checked={category === cat.documentId}
                                                onChange={() => setCategory(cat.documentId)}
                                                className="accent-[#F2C078]"
                                            />
                                            {cat.name}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="py-2">
                            <label>Stock</label>
                            <input
                                type="number"
                                value={stock}
                                onChange={e => setStock(Number(e.target.value))}
                                className="w-full mt-2 md:mt-4 py-1 border-2 rounded-md text-black px-2"
                                placeholder="Enter total stock"
                                min={0}
                            />
                        </div>
                        <div className="py-2">
                            <label>Cover</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => {
                                    if (e.target.files && e.target.files[0]) {
                                        setCoverFile(e.target.files[0]);
                                    }
                                }}
                                className="mt-2 md:mt-4 w-full"
                            />
                            {bookData?.cover?.url && (
                                <div className="mt-2">
                                    <p className="text-sm mb-1">Current Cover:</p>
                                    <img 
                                        src={`${process.env.NEXT_PUBLIC_API_URL || ''}${bookData.cover.url}`} 
                                        alt="Current cover" 
                                        className="w-32 h-32 object-cover rounded"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 py-4">
                            <Link 
                                href="/buku" 
                                className="bg-[#F0F2BD] hover:bg-[#F2C078] duration-300 text-black py-2 px-4 clip-custom text-center"
                            >
                                ← Back
                            </Link>
                            <button
                                disabled={loading}
                                onClick={handleSubmit}
                                className="bg-[#F0F2BD] hover:bg-[#F2C078] duration-300 text-black py-2 px-4 clip-custom disabled:opacity-50"
                            >
                                {loading ? "Saving..." : "Save Book"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-[#F2C078] w-[90%] md:w-[500px] h-auto md:h-[142px] p-4 md:p-0 rounded-xl shadow-lg">
                        <div className="w-full md:w-64 font-cyrodiil flex flex-col items-center justify-center text-center">
                            <h1 className="text-lg md:text-xl mb-4">
                                {popupMessage}
                            </h1>
                            <button
                                className="bg-green-400 hover:bg-green-600 duration-300 text-white px-4 md:px-8 py-2 clip-custom"
                                onClick={handlePopupClose}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}