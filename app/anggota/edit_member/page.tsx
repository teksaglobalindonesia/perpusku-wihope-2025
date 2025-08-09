"use client";

import Header from "@/components/customs/layouts/header";
import Footer from "@/components/customs/layouts/footer";
import EditMemb from "@/components/customs/member/edit_member";
import { useState, useEffect } from "react";
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
        <EditMemb/>
        <Footer/>
        </>
    )
}