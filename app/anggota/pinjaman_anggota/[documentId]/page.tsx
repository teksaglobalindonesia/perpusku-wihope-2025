import Header from "@/components/customs/layouts/header";
import Footer from "@/components/customs/layouts/footer";
import PinjamanMemb from "@/components/customs/member/Pinjaman";
import { fetchLoanMember } from "@/lib/api";
import { fetchBooks } from "@/lib/api";

interface Props {
    params: {
        documentId: string;
    };
}

export default async function Page({ params }: Props){
    const { data: loans } = await fetchLoanMember(params.documentId);
    const { data: books } = await fetchBooks();
    return(
        <>
        <Header/>
        <PinjamanMemb 
        loans={loans}
        books={books}
        />
        <Footer/>
        </>
    )
}