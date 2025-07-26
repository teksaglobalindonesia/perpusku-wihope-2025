import { B_BookList } from "@/components/custom/admin/B_BookList";
// import { D_Header } from "@/components/custom/admin/header";
import { BookList } from '@/app/dashboard/page'



const B_Books = () => {
    return (
        <>
            {/* <D_Header items={D_NavLinks} /> */}
            <B_BookList bookListItems={BookList} />
        </>
    );
}

export default B_Books;