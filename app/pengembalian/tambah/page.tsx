"use client";

import Header from "@/components/customs/layouts/header";
import TambahReturn from "@/components/customs/pengembalian/tambah";
import Footer from "@/components/customs/layouts/footer";
import { useState, useEffect } from "react";
import useLoading from "@/components/customs/loading/useLoading";
import Loading from "@/components/customs/loading/Loading";
import { fetchLoans, fetchBooks } from "@/lib/api";

export default function Page(){
    const loading = useLoading();
    const [loans, setLoans] = useState([]);
    const [books, setBooks] = useState([])

    useEffect(() => {
            fetchLoans().then(({ data: loans }) => setLoans(loans));
            fetchBooks().then(({ data: books }) => setBooks(books));
        }, [])

    if(loading){
        return <Loading/>
    }

    return(
        <>
        <Header/>
        <TambahReturn 
        loans={loans}
        books={books}
        />
        <Footer/>
        </>
    )
}