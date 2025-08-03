import { Angopin } from "@/components/custom/anggota_pinjam";
import { TOKEN, WIHOPE_NAME, BASE_URL } from "@/lib/constant";

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const memberId = params.id;

  const [memberRes, bookRes, loanRes] = await Promise.all([
    fetch(`${BASE_URL}/api/member/list`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: TOKEN,
        'x-wihope-name': WIHOPE_NAME,
      },
      cache: 'no-store'
    }),
    fetch(`${BASE_URL}/api/book/list`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: TOKEN,
        'x-wihope-name': WIHOPE_NAME,
      },
      cache: 'no-store'
    }),
    fetch(`${BASE_URL}/api/loan/list`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: TOKEN,
        'x-wihope-name': WIHOPE_NAME,
      },
      cache: 'no-store'
    }),
  ]);

  const [members, books, loans] = await Promise.all([
    memberRes.json(),
    bookRes.json(),
    loanRes.json(),
  ]);

  const filteredLoans = loans.data.filter(
    (loan: any) => loan.member.documentId === memberId
  );

  const combined = filteredLoans.map((loan: any) => {
    const book = books.data.find((b: any) => b.documentId === loan.book.documentId);

    const today = new Date();
    const returnDate = loan.return_date;
    const actualReturn = loan.actual_return;
    const returnDateObj = new Date(returnDate);
    const actualReturnObj = actualReturn ? new Date(actualReturn) : null;

    let status = 1;

    if (actualReturnObj) {
      status = 2;
    } else if (returnDateObj < today) {
      status = 3;
    }

    return {
      nama: loan.member.name,
      title: book?.title || "-",
      Peminjaman: loan.loan_date,
      Pengembalian: loan.return_date,
      dikembali: actualReturn || "-",
      status,
    };
  });

  return <Angopin items={combined} />;
}




// return (
//     <>
//         <Angopin items={[
//             {
//                 title: 'Inazuma',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: 1,
//                 info: true
//             },
//             {
//                 title: 'Inazuma',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: 2,
//                 info: false
//             },
//             {
//                 title: 'Inazuma',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: 1,
//                 info: true
//             },
//             {
//                 title: 'Inazuma',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: 2,
//                 info: false
//             },
//             {
//                 title: 'Inazuma',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: 3,
//                 info: true
//             },
//             {
//                 title: 'Inazuma',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: 1,
//                 info: true
//             },
//             {
//                 title: 'Inazuma',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: 1,
//                 info: true
//             },
//             {
//                 title: 'Inazuma',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: 2,
//                 info: false
//             },
//             {
//                 title: 'Inazuma',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: 3,
//                 info: true
//             },
//             {
//                 title: 'Inazuma',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: 3,
//                 info: true
//             },
//             {
//                 title: 'Inazuma',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: 2,
//                 info: false
//             },
//             {
//                 title: 'Inazuma',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: 2,
//                 info: false
//             },
//         ]} />
//     </>
// );