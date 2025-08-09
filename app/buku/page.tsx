"use client";

import Header from "@/components/customs/layouts/header";
import ListBuku from "@/components/customs/buku/buku";
import Footer from "@/components/customs/layouts/footer";
import Welcome from "@/components/customs/layouts/welcome";
import { fetchBooks } from "@/lib/api";
import useLoading from "@/components/customs/loading/useLoading";
import Loading from "@/components/customs/loading/Loading";
import { useState, useEffect } from "react";

export default function Page() {
  const loading = useLoading();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks().then(({ data }) => setBooks(data));
  }, []);

  if(loading){
    return <Loading/>
  }

  return (
    <>
      <Header />
      <Welcome
        title="Welcome to Our Books Collections"
        subtitle="These are the books that you can borrow"
      />
      <ListBuku books={books}/>
      <Footer />
    </>
  );
}
