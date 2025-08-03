import { Pinjamya } from "@/components/custom/peminjam";
import { TOKEN, WIHOPE_NAME, BASE_URL } from "@/lib/constant";

export default async function Page() {
  const res = await fetch(`${BASE_URL}/api/loan/list`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: TOKEN,
      'x-wihope-name': WIHOPE_NAME,
    },
    cache: 'no-store'
  });

  const resultJson = await res.json();

  const mappedData = resultJson?.data?.map((item: any) => ({
  title: item?.book?.title,
  name: item?.member?.name,
  createdAt: item?.loan_date,
  actual_return_date: item?.return?.actual_return_date || "-",

    status:
    item?.return?.actual_return_date &&
    new Date(item.return.actual_return_date) > new Date(item.return_date),

    info: true
  }));

  return <Pinjamya items={mappedData} />;
}


// return (
//     <>
//         <Pinjamya items={[
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: true,
//                 info: true
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: false,
//                 info: false
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: true,
//                 info: true
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: false,
//                 info: false
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: true,
//                 info: true
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: true,
//                 info: true
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: true,
//                 info: true
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: false,
//                 info: false
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: true,
//                 info: true
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: true,
//                 info: true
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: false,
//                 info: false
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: false,
//                 info: false
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: true,
//                 info: true
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: false,
//                 info: false
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: true,
//                 info: true
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: false,
//                 info: false
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: true,
//                 info: true
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: true,
//                 info: true
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: true,
//                 info: true
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: false,
//                 info: false
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: true,
//                 info: true
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: true,
//                 info: true
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: false,
//                 info: false
//             },
//             {
//                 title: 'Inazuma',
//                 nama: 'Ayu Dea',
//                 Peminjaman: '11 juni 2025, 08.00',
//                 Pengembalian: '20 juni 2025',
//                 status: false,
//                 info: false
//             },
//         ]} />
//     </>
// );