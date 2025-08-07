
import { R_ReturnList } from "@/components/custom/admin/R_ReturnList";
import { BASE_URL, NAME, TOKEN } from "@/lib/api";
import { Member, Pagination, ReturnRecord } from "@/type/api-response";

export type StatusBukuType = {
    statusBukuItems?: ReturnRecord[];
    member: Member[];
    pagination?: Pagination
};

export default async function R_Return() {
    const anggotas = await fetch(
        `${BASE_URL}/api/return/list`,
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
            <R_ReturnList statusBukuItems={data} member={data}/>
        </>
    );
}
