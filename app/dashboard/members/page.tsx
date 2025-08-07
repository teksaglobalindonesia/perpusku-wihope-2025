import { M_MemberList } from "@/components/custom/admin/M_MemberList";
import { BASE_URL, NAME, TOKEN } from "@/lib/api";
import { Loan, Member, Pagination } from "@/type/api-response";

export type UserType = {
    id_member?: string;
    userItems?: Member[]
    pagination?: Pagination;
    statusBukuItems?: Loan[];
}

export default async function M_Members() {

    const anggotas = await fetch(
        `${BASE_URL}/api/member/list`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: TOKEN,
                'x-wihope-name': NAME,
            },
            cache: 'no-store',
        }
    );
    const { data } = await anggotas.json();

    return (
        <>
            {/* <D_Header items={D_NavLinks} /> */}
            <M_MemberList userItems={data} />
        </>
    );
}