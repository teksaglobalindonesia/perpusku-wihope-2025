import { D_Header } from "@/components/custom/admin/header"
import { D_NavLinks } from "../../page"
import { M_EditMember } from "@/components/custom/admin/M_EditMember"

const M_Edit = () => {
    return (
        <>
            <D_Header items={D_NavLinks} />
            <M_EditMember />
        </>
    )
}

export default M_Edit