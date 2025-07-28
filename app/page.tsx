import Header from "@/components/customs/layouts/header";
import Welcome from "@/components/customs/layouts/welcome";
import Habis from "@/components/customs/dashboard/stok-habis";
import Pinjaman from "@/components/customs/dashboard/D_pinjaman";
import Pengembali from "@/components/customs/dashboard/D_pengembalian";
import Goodbye from "@/components/customs/layouts/goodbye";
import Footer from "@/components/customs/layouts/footer";

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
