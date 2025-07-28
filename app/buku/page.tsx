import Header from "@/components/customs/layouts/header";
import ListBuku from "@/components/customs/buku/list-buku";
import Footer from "@/components/customs/layouts/footer";
import Welcome from "@/components/customs/layouts/welcome";

export default function Page(){
    return(
        <>
        <Header/>
        <Welcome
            title="Welcome to Our Books Collections"
            subtitle="These are the books that you can borrow"
        />
        <ListBuku/>
        <Footer/>
        </>
    )
}