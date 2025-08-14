"use client";

import Header from "@/components/customs/layouts/header";
import Footer from "@/components/customs/layouts/footer";
import EditMemb from "@/components/customs/member/edit_member";
import useLoading from "@/components/customs/loading/useLoading";
import Loading from "@/components/customs/loading/Loading";

export default function Page({ params }: {params: {documentId: string}}){
    const loading = useLoading();
    
    if(loading){
        return <Loading/>
    }
    return(
        <>
        <Header/>
        <EditMemb documentId={params.documentId}/>
        <Footer/>
        </>
    )
}