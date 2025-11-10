// app/loans/[id]/page.tsx

import { MPeminjaman } from "@/components/custom/MPeminjaman";


export default async function LoanPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold text-vintage-sage">
        Daftar Peminjaman
      </h1>
      <MPeminjaman documentId={params.id} />
    </div>
  );
}