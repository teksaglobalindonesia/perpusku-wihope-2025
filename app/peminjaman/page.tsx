import Header from "@/components/customs/layouts/header";
import Peminjaman from "@/components/customs/peminjaman/peminjaman";
import Footer from "@/components/customs/layouts/footer";
import { fetchLoans } from "@/lib/api";

export default async function Page(){
    const { data } = await fetchLoans();

    return(
        <>
        <Header/>
        <Peminjaman peminjamans={data}/>
        <Footer/>
        </>
    )
}