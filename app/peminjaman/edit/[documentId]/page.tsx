"use client";

import Header from "@/components/customs/layouts/header";
import Footer from "@/components/customs/layouts/footer";
import EditLoan from "@/components/customs/peminjaman/edit-peminjaman";
import { fetchBooks } from "@/lib/api";
import useLoading from "@/components/customs/loading/useLoading";
import Loading from "@/components/customs/loading/Loading";
import { useState, useEffect } from "react";

export default function Page({ params }: {params: {documentId: string}}){
    const loading = useLoading();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks().then(({ data: books}) => setBooks(books));
    }, [])

    if(loading){
        return <Loading/>
    }
    return(
        <>
        <Header/>
        <EditLoan
        books={books}
        documentId={params.documentId}/>
        <Footer/>
        </>
    )
}