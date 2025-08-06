import Header from "@/components/customs/layouts/header";
import Peminjaman from "@/components/customs/peminjaman/peminjaman";
import Footer from "@/components/customs/layouts/footer";
import { fetchLoans } from "@/lib/api";
import { fetchBooks } from "@/lib/api";
import { fetchReturn } from "@/lib/api";

export default async function Page(){
    const { data: loans } = await fetchLoans();
    const { data: books } = await fetchBooks();
    const { data: returns } = await fetchReturn();

    return(
        <>
        <Header/>
        <Peminjaman 
        peminjamans={loans}
        books={books}
        returns={returns}
        />
        <Footer/>
        </>
    )
}