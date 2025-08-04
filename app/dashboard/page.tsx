import { D_EmptyBook } from "@/components/custom/admin/D_EmptyBook";
import { D_LoanBooks } from "@/components/custom/admin/D_LoanBook";
import { D_ReturnBooks } from "@/components/custom/admin/D_ReturnBook";
import { Member, Book, ReturnRecord } from "@/type/api-response";
import { BASE_URL, NAME, TOKEN } from "@/lib/api";

export type StatusBukuType = {
    statusBookItems?: Book[];
    member?: Member;
    return?:ReturnRecord ;
    maxData?: number;
};


export const D_NavLinks = [
    {
        link: '/dashboard',
        label: 'Dashboard'
    },
    {
        link: '/dashboard/books',
        label: 'Buku'
    },
    {
        link: '/dashboard/members',
        label: 'Anggota'
    },
    {
        link: '/dashboard/loans',
        label: 'Peminjaman'
    },
    {
        link: '/dashboard/returns',
        label: 'Pengembalian'
    }
]
export default async function Dashboard() {
    const response = await fetch(
        `${BASE_URL}/api/book/list`,
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

    const responseLoan = await fetch(
        `${BASE_URL}/api/loan/list?status=loaned`,
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

    const { data: dataPeminjaman } = await responseLoan.json();

    const responseReturn = await fetch(
        `${BASE_URL}/api/return/list`,
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

    const { data: dataPengembalian } = await responseReturn.json();

    return (
        <>
            {/* <D_Header items={D_NavLinks} /> */}
            <D_EmptyBook statusBookItems={data} />
            <D_LoanBooks statusBookItems={dataPeminjaman} />
            <D_ReturnBooks statusBookItems={dataPengembalian}/>
        </>
    );
}
