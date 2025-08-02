import Header from "@/components/customs/layouts/header";
import Pengembalian from "@/components/customs/pengembalian/pengembalian";
import Footer from "@/components/customs/layouts/footer";
import { fetchReturn } from "@/lib/api";

export default async function Page(){
    const { data } = await fetchReturn();
    return(
        <>
        <Header/>
        <Pengembalian returns={ data }/>
        <Footer/>
        </>
    )
}