"use client";

import HapusDialog from "@/components/custom/buku/hapuusbuku";

export default function BukuPage() {
  return (
    <>
      <HapusDialog 
        documentId="contoh-document-id" 
        onConfirm={() => console.log("Buku dihapus")} 
      />
    </>
  );
}
