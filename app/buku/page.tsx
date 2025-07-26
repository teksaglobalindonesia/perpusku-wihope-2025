import Header from "@/components/customs/header";
import ListBuku from "@/components/customs/list-buku";
import Footer from "@/components/customs/footer";
import Welcome from "@/components/customs/welcome";

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