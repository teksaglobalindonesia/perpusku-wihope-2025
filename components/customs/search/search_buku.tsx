"use client";

import { useState, useEffect } from "react";
import { fetchBookSearch } from "@/lib/api";

interface Book {
    id: number;
    title: string;
    writer?: string;
    categories?: { name: string }[];
    [key: string]: any;
}

interface Props {
    onSearch: (filteredData: Book[]) => void;
    className?: string;
}

export default function SearchBook({ onSearch, className }: Props) {
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (!query.trim()) {
                onSearch([]);
                return;
            }
            try {
                const books = await fetchBookSearch(query);
                onSearch(books);
            } catch (err) {
                console.error("Gagal fetch:", err);
                onSearch([]);
            }
        };
        fetchData();
    }, [query]);


    return (
        <>
        <input
            type="text"
            placeholder="Search by title, writer, or anything else..."
            className={`px-4 py-2 border-2 md:border-4 rounded-md text-sm md:text-lg w-full ${className ?? ""}`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
        </>
    );
}
