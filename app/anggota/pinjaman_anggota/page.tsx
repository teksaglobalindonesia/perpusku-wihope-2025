import Header from "@/components/customs/layouts/header";
import Footer from "@/components/customs/layouts/footer";
import PinjamanMemb from "@/components/customs/member/Pinjaman";
import { fetchMembers } from "@/lib/api";

export default async function Page(){
    const {data} = await fetchMembers();
    return(
        <>
        <Header/>
        <PinjamanMemb loans={data}/>
        <Footer/>
        </>
    )
}