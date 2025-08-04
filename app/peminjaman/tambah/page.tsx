import Header from "@/components/customs/layouts/header";
import Footer from "@/components/customs/layouts/footer";
import TambahPemjmn from "@/components/customs/peminjaman/tambah";
import { fetchBooks } from "@/lib/api";
import { fetchMembers } from "@/lib/api";

export default async function Page(){
    const { data: books } = await fetchBooks();
    const { data: members } = await fetchMembers();
    return(
        <>
        <Header/>
        <TambahPemjmn
        books={books}
        members={members}/>
        <Footer/>
        </>
    )
}