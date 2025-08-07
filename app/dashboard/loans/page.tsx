import { L_LoanList } from "@/components/custom/admin/L_LoanList";
import { BASE_URL, NAME, TOKEN } from "@/lib/api";
import { Member, Loan, Pagination } from "@/type/api-response";

export type LoanListType = {
    statusBukuItems?: Loan[]
    member: Member;
    pagination?: Pagination
};

export default async function L_Loan() {
    const response = await fetch(
        `${BASE_URL}/api/loan/list`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: TOKEN,
                'x-wihope-name': NAME
            },
            cache: 'no-store',
        }
    );
    const { data } = await response.json();

    return (
        <>
            {/* <D_Header items={D_NavLinks} /> */}
            <L_LoanList statusBukuItems={data} member={data?.member} />
        </>
    );
}
