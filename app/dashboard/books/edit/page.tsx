import { D_Header } from "@/components/custom/admin/header";
import { D_NavLinks } from '@/app/dashboard/page'
import { B_EditBook } from '@/components/custom/admin/B_EditBook';

const B_Edit = () => {
    return (
        <>
            <D_Header items={D_NavLinks}/>
            <B_EditBook/>
        </>
    )
}

export default B_Edit;