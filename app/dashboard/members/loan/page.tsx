import { D_Header } from "@/components/custom/admin/header"
import { D_NavLinks } from "../../page"
import { M_Peminjaman } from "@/components/custom/admin/M_Peminjaman"


const M_Loan = () => {
    return (
        <>
            <D_Header items={D_NavLinks} />
            <M_Peminjaman />
        </>
    )
}

export default M_Loan