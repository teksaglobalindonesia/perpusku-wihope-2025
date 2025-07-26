import Header from "@/components/customs/header";
import Welcome from "@/components/customs/welcome";
import Habis from "@/components/customs/stok-habis";
import Pinjaman from "@/components/customs/pinjaman";
import Pengembali from "@/components/customs/pengembalian";
import Goodbye from "@/components/customs/goodbye";
import Footer from "@/components/customs/footer";

export default function Page() {
  return (
    <>
    <Header/>
    <Welcome
      title="Welcome to Imperial Library"
      subtitle="The Central Library of All Tamriel"
    />
    <Habis/>
    <Pinjaman/>
    <Pengembali/>
    <Goodbye/>
    <Footer/>
    </>
  );
}
