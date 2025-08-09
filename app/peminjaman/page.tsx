"use client";

import Header from "@/components/customs/layouts/header";
import Peminjaman from "@/components/customs/peminjaman/peminjaman";
import Footer from "@/components/customs/layouts/footer";
import { fetchLoans, fetchBooks, fetchReturn } from "@/lib/api";
import useLoading from "@/components/customs/loading/useLoading";
import Loading from "@/components/customs/loading/Loading";
import { useState, useEffect } from "react";

export default function Page(){
    const loading = useLoading();
    const [loans, setLoans] = useState([]);
    const [books, setBooks] = useState([]);
    const [returns, setReturns] = useState([]);

    useEffect(() => {
        fetchBooks().then(({ data: books }) => setBooks(books));
        fetchLoans().then(({ data: loans }) => setLoans(loans));
        fetchReturn().then(({ data: returns }) => setReturns(returns));
    }, [])

    if(loading){
        return <Loading/>
    }

    return(
        <>
        <Header/>
        <Peminjaman 
        peminjamans={loans}
        books={books}
        returns={returns}
        />
        <Footer/>
        </>
    )
}