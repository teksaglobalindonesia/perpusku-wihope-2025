"use client";

import { useState, useEffect } from "react";
import { fetchMemberSearch } from "@/lib/api";

interface Member {
    id: number;
    name: string;
    email: string;
    address: string;
    id_member: string;
}

interface Props {
    onSearch: (filteredData: Member[]) => void;
}

export default function SearchMember({ onSearch }: Props) {
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (!query.trim()) {
                onSearch([]);
                return;
            }
            try{
                const members = await fetchMemberSearch(query);
                onSearch(members);
            } catch (err) {
                console.error("Gagal fetch:", err);
                onSearch([]);
            }
        };
        fetchData();
    }, [query]);

    return(
        <>
        <input 
            type="text"
            placeholder="Search by name, email, address, or id_member..."
            className="px-4 py-2 border-2 md:border-4 rounded-md text-sm md:text-lg w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
        </>
    )
}