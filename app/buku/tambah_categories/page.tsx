"use client";

import Header from "@/components/customs/layouts/header";
import TambahCate from "@/components/customs/buku/categories/tambah-categories";
import Footer from "@/components/customs/layouts/footer";
import useLoading from "@/components/customs/loading/useLoading";
import Loading from "@/components/customs/loading/Loading";

export default function Page(){
    const loading = useLoading();

    if(loading){
        return <Loading/>
    }

    return(
        <>
        <Header/>
        <TambahCate/>
        <Footer/>
        </>
    )
}