"use client";

import Header from "@/components/customs/layouts/header";
import Footer from "@/components/customs/layouts/footer";
import TambahBuku from "@/components/customs/buku/tambah-buku";
import useLoading from "@/components/customs/loading/useLoading";
import Loading from "@/components/customs/loading/Loading";
import { fetchCategories } from "@/lib/api";
import { useState, useEffect } from "react";

interface Category {
    id: number;
    documentId: string;
    name: string;
    createdAt?: string;
}

export default function Page() {
    const loading = useLoading();
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
                setCategories([]);
            }
        };

        loadCategories();
    }, []);

    if (loading) {
        return <Loading/>;
    }

    return (
        <>
            <Header/>
            <TambahBuku categories={categories}/>
            <Footer/>
        </>
    );
}