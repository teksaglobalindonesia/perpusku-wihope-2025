import { Tah_pinjam } from "@/components/custom/peminjam_tambah";

export default async function Page() {

    return (
        <>
            <Tah_pinjam
                items={[
                    {
                        title: "Matahari ku",
                        genre: "Romantis",
                        penulis: "Rakna",
                        type: "buku"
                    },
                    {
                        title: "Bulan ku",
                        genre: "Romantis",
                        penulis: "Rakna",
                        type: "buku"
                    },
                    {
                        title: "Bintang Kecil",
                        genre: "Romantis",
                        penulis: "Rakna",
                        type: "buku"
                    },
                    {
                        title: "Ombak Menuju Cakrawala",
                        genre: "Romantis",
                        penulis: "Rakna",
                        type: "buku"
                    },
                    {
                        id: "1",
                        nama: "Anggota A",
                        email: "anggota@email.com",
                        type: "anggota"
                    },
                    {
                        id: "2",
                        nama: "Anggota B",
                        email: "anggota@email.com",
                        type: "anggota"
                    },
                    {
                        id: "3",
                        nama: "Anggota C",
                        email: "anggota@email.com",
                        type: "anggota"
                    },
                ]} />
        </>
    );
}