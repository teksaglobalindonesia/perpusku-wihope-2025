import PeminjamanAnggota from "@/components/custom/anggota/peminjaman";

export default function PeminjamanAnggotaPage({ params }: { params: { id: string } }) {
  return <PeminjamanAnggota id={params.id} />;
}
