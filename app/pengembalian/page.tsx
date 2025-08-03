import { Kembaliya } from "@/components/custom/pengembalian";
import { TOKEN, WIHOPE_NAME, BASE_URL } from "@/lib/constant";

export default async function Page() {
  const res = await fetch(`${BASE_URL}/api/loan/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: TOKEN,
      "x-wihope-name": WIHOPE_NAME,
    },
    cache: "no-store",
  });

  const resultJson = await res.json();

  const mappedData = resultJson?.data?.map((item: any) => {
    const actualReturnDate = item?.return?.actual_return_date;
    const expectedReturnDate = item?.return_date;

    const isLate =
      actualReturnDate &&
      expectedReturnDate &&
      new Date(actualReturnDate) > new Date(expectedReturnDate);

    return {
      title: item?.book?.title || "Judul tidak ditemukan",
      name: item?.member?.name || "Nama tidak ditemukan",
      createdAt: item?.loan_date,
      returnDate: expectedReturnDate,
      actualReturnDate: actualReturnDate || "-",
      status: isLate || false,
    };
  });

  return <Kembaliya items={mappedData} />;
}


// return (
//     <>
//         <Kembaliya items={[
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: true,
//                 dikembali: '29 juni 2025',
//             },
//             {
//                 title: 'Sejarah Indonesia',
//                 nama: 'Siapapun',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '10 juni 2025',
//                 status: false,
//                 dikembali: '15 juni 2025',
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: true,
//                 dikembali: '29 juni 2025',
//             },
//             {
//                 title: 'Sejarah Indonesia',
//                 nama: 'Siapapun',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '10 juni 2025',
//                 status: false,
//                 dikembali: '15 juni 2025',
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: true,
//                 dikembali: '29 juni 2025',
//             },
//             {
//                 title: 'Sejarah Indonesia',
//                 nama: 'Siapapun',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '10 juni 2025',
//                 status: false,
//                 dikembali: '15 juni 2025',
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: true,
//                 dikembali: '29 juni 2025',
//             },
//             {
//                 title: 'Sejarah Indonesia',
//                 nama: 'Siapapun',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '10 juni 2025',
//                 status: false,
//                 dikembali: '15 juni 2025',
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: true,
//                 dikembali: '29 juni 2025',
//             },
//             {
//                 title: 'Sejarah Indonesia',
//                 nama: 'Siapapun',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '10 juni 2025',
//                 status: false,
//                 dikembali: '15 juni 2025',
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: true,
//                 dikembali: '29 juni 2025',
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: true,
//                 dikembali: '29 juni 2025',
//             },
//             {
//                 title: 'Sejarah Indonesia',
//                 nama: 'Siapapun',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '10 juni 2025',
//                 status: false,
//                 dikembali: '15 juni 2025',
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: true,
//                 dikembali: '29 juni 2025',
//             },
//             {
//                 title: 'Sejarah Indonesia',
//                 nama: 'Siapapun',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '10 juni 2025',
//                 status: false,
//                 dikembali: '15 juni 2025',
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: true,
//                 dikembali: '29 juni 2025',
//             },
//             {
//                 title: 'Sejarah Indonesia',
//                 nama: 'Siapapun',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '10 juni 2025',
//                 status: false,
//                 dikembali: '15 juni 2025',
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: true,
//                 dikembali: '29 juni 2025',
//             },
//             {
//                 title: 'Sejarah Indonesia',
//                 nama: 'Siapapun',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '10 juni 2025',
//                 status: false,
//                 dikembali: '15 juni 2025',
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: true,
//                 dikembali: '29 juni 2025',
//             },
//             {
//                 title: 'Sejarah Indonesia',
//                 nama: 'Siapapun',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '10 juni 2025',
//                 status: false,
//                 dikembali: '15 juni 2025',
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: true,
//                 dikembali: '29 juni 2025',
//             },
//         ]}/>
//     </>
// );