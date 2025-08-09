"use client";

import Header from "@/components/customs/layouts/header";
import Welcome from "@/components/customs/layouts/welcome";
import Habis from "@/components/customs/dashboard/stok-habis";
import Pinjaman from "@/components/customs/dashboard/pinjaman";
import Pengembali from "@/components/customs/dashboard/pengembalian";
import Goodbye from "@/components/customs/layouts/goodbye";
import Footer from "@/components/customs/layouts/footer";
import { fetchBooks, fetchLoans, fetchReturn } from "@/lib/api";
import useLoading from "@/components/customs/loading/useLoading";
import Loading from "@/components/customs/loading/Loading";
import { useState, useEffect } from "react";

  export default function Page() {
    const loading = useLoading();
    const [books, setBooks] = useState([]);
    const [loans, setLoans] = useState([]);
    const [returns, setReturns] = useState([]);

    useEffect(() => {
      fetchBooks().then(({ data: books }) => setBooks(books));
      fetchLoans().then(({ data: loans }) => setLoans(loans));
      fetchReturn().then(({ data: returns }) => setReturns(returns))
    }, [])

    if(loading){
      return <Loading/>
    }

    return (
      <>
      <Header/>
      <Welcome
        title="Welcome to Imperial Library"
        subtitle="The Central Library of All Tamriel"
      />
      <Habis books={books}/>
      <Pinjaman 
      loans={loans}
      books={books}/>
      <Pengembali returns={returns}/>
      <Goodbye/>
      <Footer/>
      </>
    );
  }
