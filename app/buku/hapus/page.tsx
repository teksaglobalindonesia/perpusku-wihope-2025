import HapusDialog from "@/components/custom/buku/hapuusbuku";

export default function BukuPage() {
  return (
    <>
      <HapusDialog onConfirm={() => console.log("Buku dihapus")} />
    </>
  );
}
