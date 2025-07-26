import PeminjamanList from "@/components/custom/peminjaman/peminjaman";

export default function PeminjamanPage() {
    return(
        <main className="p-3">
            <h1 className="text-navy font-bold mb-4 text-2xl">
                Peminjaman
                <PeminjamanList/>
            </h1>
        </main>
    )
}