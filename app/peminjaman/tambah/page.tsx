import Header from "@/components/customs/layouts/header";
import Footer from "@/components/customs/layouts/footer";
import TambahPemjmn from "@/components/customs/peminjaman/tambah";
import { fetchBooks } from "@/lib/api";

export default async function Page(){
    const { data } = await fetchBooks();
    return(
        <>
        <Header/>
        <TambahPemjmn/>
        <Footer/>
        </>
    )
}