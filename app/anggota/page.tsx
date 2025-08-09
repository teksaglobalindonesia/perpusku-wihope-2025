"use client";

import Header from "@/components/customs/layouts/header";
import ListAnggota from "@/components/customs/member/member";
import Footer from "@/components/customs/layouts/footer";
import { fetchMembers } from "@/lib/api";
import { useState, useEffect } from "react";
import useLoading from "@/components/customs/loading/useLoading";
import Loading from "@/components/customs/loading/Loading";

export default function Page(){
    const loading = useLoading();
    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetchMembers().then(({ data }) => setMembers(data))
    }, [])

    if(loading){
        return <Loading/>
    }

    return(
        <>
        <Header/>
        <ListAnggota members={members}/>
        <Footer/>
        </>
    )
}