import Header from "@/components/customs/layouts/header";
import Welcome from "@/components/customs/layouts/welcome";
import Habis from "@/components/customs/dashboard/stok-habis";
import Pinjaman from "@/components/customs/dashboard/pinjaman";
import Pengembali from "@/components/customs/dashboard/pengembalian";
import Goodbye from "@/components/customs/layouts/goodbye";
import Footer from "@/components/customs/layouts/footer";
import { fetchBooks, fetchLoans, fetchReturn } from "@/lib/api";

  export default async function Page() {
    const { data: books } = await fetchBooks();
    const { data: loans } = await fetchLoans();
    const { data: returns } = await fetchReturn();

    return (
      <>
      <Header/>
      <Welcome
        title="Welcome to Imperial Library"
        subtitle="The Central Library of All Tamriel"
      />
      <Habis books={books}/>
      <Pinjaman 
      loans={loans}
      books={books}/>
      <Pengembali returns={returns}/>
      <Goodbye/>
      <Footer/>
      </>
    );
  }
