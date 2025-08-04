"use client";

import { useState, useEffect } from "react";
import { fetchLoanSearch } from "@/lib/api";

interface Loan {
    id: number;
    book?: string;
    member?: string;
    loan_date: Date;
    return_date: Date;
}

interface Props {
    onSearch: (filteredData: Loan[]) => void;
    className?: string;
}

export default function SearchLoan({ onSearch, className }: Props) {
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (!query.trim()) {
                onSearch([]);
                return;
            }
            try {
                const loans = await fetchLoanSearch(query);
                onSearch(loans);
            } catch (err) {
                console.error("Gagal fetch:", err);
                onSearch([]);
            }
        };
        fetchData();
    }, [query])

    return(
        <>
        <input type="text" 
            placeholder="Search by book, member, or date..."
            className={`px-4 py-2 border-2 md:border-4 rounded-md text-sm md:text-lg w-full ${className ?? ""}`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}    
        />
        </>
    )
}