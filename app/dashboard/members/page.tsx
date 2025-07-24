import { D_Header } from "@/components/custom/admin/header";
import { D_NavLinks } from "../page";
import { M_MemberList } from "@/components/custom/admin/M_MemberList";
import { User } from "@/app/dashboard/page"

export default function M_Members() {
    return (
        <>
            <D_Header items={D_NavLinks} />
            <M_MemberList userItems={User}/>
        </>
    );
}