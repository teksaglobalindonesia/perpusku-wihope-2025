import { M_Peminjaman } from "@/components/custom/admin/M_Peminjaman"

const M_Loan = ({ params }: { params: { documentId: string } }) => {
    
    return (
        <>
            <M_Peminjaman id_member={params.documentId} />
        </>
    )
}

export default M_Loan