import EditAnggota from "@/components/custom/anggota/editanggota";

export default function EditPage({ params }: { params: { id: string } }) {
  return <EditAnggota id={params.id} />;
}
