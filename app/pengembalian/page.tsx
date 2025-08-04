import Header from "@/components/customs/layouts/header";
import Pengembalian from "@/components/customs/pengembalian/pengembalian";
import Footer from "@/components/customs/layouts/footer";
import { fetchReturn } from "@/lib/api";
import { fetchBooks } from "@/lib/api";

export default async function Page(){
    const { data: returns } = await fetchReturn();
    const { data: books } = await fetchBooks();

    return(
        <>
        <Header/>
        <Pengembalian 
        returns={ returns }
        books={ books }
        />
        <Footer/>
        </>
    )
}