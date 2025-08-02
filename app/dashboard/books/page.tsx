import { B_BookList } from "@/components/custom/admin/B_BookList";
import { BASE_URL, NAME, TOKEN } from "@/lib/api";
import { Book } from "@/type/api-response";

export type BookListType = {
    bookListItems?: Book[];
    maxData?: number;
};

export default async function B_Books() {
    const bukus = await fetch(
        `${BASE_URL}/api/book/list`,
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
    const {data} = await bukus.json();

    return (
        <>
            <B_BookList bookListItems={data} maxData={5} />
        </>
    );
}