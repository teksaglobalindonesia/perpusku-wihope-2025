import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";
import { Angopin } from "@/components/custom/anggota_pinjam";

type Props = {
  params: { id: string };
  searchParams: { page?: string };
};

export default async function Page({ params, searchParams }: Props) {
  const memberId = params.id;
  const currentPage = parseInt(searchParams.page || "1");
  const pageSize = 6;

  const [loanRes, bookRes] = await Promise.all([
    fetch(
      `${BASE_URL}/api/loan/list?id_member=${memberId}&sort=createdAt:desc&page=${currentPage}&page_size=${pageSize}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
          "x-wihope-name": WIHOPE_NAME,
        },
        cache: "no-store",
      }
    ),
    fetch(`${BASE_URL}/api/book/list`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
        "x-wihope-name": WIHOPE_NAME,
      },
      cache: "no-store",
    }),
  ]);

  const [loans, books] = await Promise.all([
    loanRes.json(),
    bookRes.json(),
  ]);

  const combined = loans.data.map((loan: any) => {
    const book = books.data.find((b: any) => b.documentId === loan.book.documentId);

    const today = new Date();
    const returnDate = new Date(loan.return_date);
    const actualReturn = loan.actual_return ? new Date(loan.actual_return) : null;

    let status = 3; 
    if (actualReturn) {
      status = 2; 
    } else if (returnDate < today) {
      status = 1; 
    }

    return {
      nama: loan.member.name,
      title: book?.title || "-",
      Peminjaman: loan.loan_date,
      Pengembalian: loan.return_date,
      dikembali: loan.actual_return || "-",
      status,
    };
  });

  const totalPages = loans.meta?.pagination?.page_count || 1;

  return (
    <Angopin
      items={combined}
      currentPage={currentPage}
      totalPages={totalPages}
      memberId={memberId}
    />
  );
}
