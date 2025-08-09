"use client";

import Header from "@/components/customs/layouts/header";
import Pengembalian from "@/components/customs/pengembalian/pengembalian";
import Footer from "@/components/customs/layouts/footer";
import { fetchReturn, fetchBooks } from "@/lib/api";
import { useState, useEffect } from "react";
import useLoading from "@/components/customs/loading/useLoading";
import Loading from "@/components/customs/loading/Loading";

export default function Page(){
    const loading = useLoading();
    const [returns, setReturns] = useState([]);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchReturn().then(({ data: returns }) => setReturns(returns));
        fetchBooks().then(({ data: books }) => setBooks(books));
    }, [])

    if(loading){
        return <Loading/>
    }

    return(
        <>
        <Header/>
        <Pengembalian 
        returns={ returns }
        books={ books }
        />
        <Footer/>
        </>
    )
}