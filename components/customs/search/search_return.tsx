"use client";

import { useState, useEffect } from "react";
import { fetchReturnSearch } from "@/lib/api";

interface Return {
    id: number;
    book?: string;
    member?: string;
    loan_date: Date;
    return_date: Date;
}

interface Props {
    onSearch: (filteredData: Return[]) => void;
}

export default function SearchReturn({ onSearch }: Props) {
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (!query.trim()) {
                onSearch([]);
                return;
            }
            try {
                const returns = await fetchReturnSearch(query);
                onSearch(returns);
            } catch (err) {
                console.error("Gagal fetch:", err);
                onSearch([]);
            }
        };
        fetchData();
    }, [query, onSearch])

    return(
        <>
        <input type="text" 
            placeholder="Search by name, book, or date..."
            className="px-4 py-2 border-2 md:border-4 rounded-md text-sm md:text-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}    
        />
        </>
    )
}