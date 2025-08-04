import Header from "@/components/customs/layouts/header";
import ListBuku from "@/components/customs/buku/buku";
import Footer from "@/components/customs/layouts/footer";
import Welcome from "@/components/customs/layouts/welcome";
import { fetchBooks } from "@/lib/api";

export default async function Page() {
  const { data: books } = await fetchBooks();

  return (
    <>
      <Header />
      <Welcome
        title="Welcome to Our Books Collections"
        subtitle="These are the books that you can borrow"
      />
      <ListBuku books={books}/>
      <Footer />
    </>
  );
}
