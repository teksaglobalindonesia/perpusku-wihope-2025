"use client";

import Header from "@/components/customs/layouts/header";
import Footer from "@/components/customs/layouts/footer";
import EditBuku from "@/components/customs/buku/edit-buku";
import useLoading from "@/components/customs/loading/useLoading";
import Loading from "@/components/customs/loading/Loading";
import { useState, useEffect } from "react";
import { fetchCategories } from "@/lib/api";

interface Category {
    id: number;
    documentId: string;
    name: string;
    createdAt?: string;
}

export default function Page({ params }: {params: {documentId: string}}){
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

    if(loading){
        return <Loading/>
    }
    return(
        <>
        <Header/>
        <EditBuku 
        categories={categories}
        documentId={params.documentId}/>
        <Footer/>
        </>
    )
}