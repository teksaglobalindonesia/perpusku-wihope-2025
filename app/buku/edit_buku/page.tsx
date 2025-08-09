"use client";

import Header from "@/components/customs/layouts/header";
import Footer from "@/components/customs/layouts/footer";
import EditBuku from "@/components/customs/buku/edit-buku";
import useLoading from "@/components/customs/loading/useLoading";
import Loading from "@/components/customs/loading/Loading";
import { useState, useEffect } from "react";

export default function Page(){
    const loading = useLoading();

    if(loading){
        return <Loading/>
    }
    return(
        <>
        <Header/>
        <EditBuku/>
        <Footer/>
        </>
    )
}