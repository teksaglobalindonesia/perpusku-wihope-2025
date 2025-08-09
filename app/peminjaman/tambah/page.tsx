"use client";

import Header from "@/components/customs/layouts/header";
import Footer from "@/components/customs/layouts/footer";
import TambahPemjmn from "@/components/customs/peminjaman/tambah";
import { fetchBooks, fetchMembers } from "@/lib/api";
import useLoading from "@/components/customs/loading/useLoading";
import Loading from "@/components/customs/loading/Loading";
import { useState, useEffect, use } from "react";

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
        <TambahPemjmn
        books={books}
        members={members}/>
        <Footer/>
        </>
    )
}