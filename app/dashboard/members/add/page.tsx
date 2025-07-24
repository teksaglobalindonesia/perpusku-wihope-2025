import { D_Header } from "@/components/custom/admin/header"
import { D_NavLinks } from "../../page"
import { M_AddMember } from "@/components/custom/admin/M_AddMember"

const M_Add = () => {
    return (
        <>
            <D_Header items={D_NavLinks} />
            <M_AddMember />
        </>
    )
}

export default M_Add