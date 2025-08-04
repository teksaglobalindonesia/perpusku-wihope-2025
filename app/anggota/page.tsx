import Header from "@/components/customs/layouts/header";
import ListAnggota from "@/components/customs/member/member";
import Footer from "@/components/customs/layouts/footer";
import { fetchMembers } from "@/lib/api";

export default async function Page(){
    const { data } = await fetchMembers();

    return(
        <>
        <Header/>
        <ListAnggota members={data}/>
        <Footer/>
        </>
    )
}