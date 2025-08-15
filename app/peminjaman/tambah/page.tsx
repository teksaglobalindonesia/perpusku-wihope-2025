"use client";

import Header from "@/components/customs/layouts/header";
import Footer from "@/components/customs/layouts/footer";
import TambahLoan from "@/components/customs/peminjaman/tambah";
import { fetchBooks, fetchMembers } from "@/lib/api";
import useLoading from "@/components/customs/loading/useLoading";
import Loading from "@/components/customs/loading/Loading";
import { useState, useEffect } from "react";

export default function Page(){
    const loading = useLoading();
    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetchBooks().then(({ data: books}) => setBooks(books));
        fetchMembers().then(({ data: members }) => setMembers(members));
    }, [])

    if(loading){
        return <Loading/>
    }
    return(
        <>
        <Header/>
        <TambahLoan
        books={books}
        members={members}/>
        <Footer/>
        </>
    )
}