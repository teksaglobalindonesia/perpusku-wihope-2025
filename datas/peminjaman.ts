export type DummyPeminjamanType = {
  id: string;
  userId: string;
  tanggalPinjam: string;
  tanggalJatuhTempo: string;
  tanggalPengembalian: string | '2023-05-20';
  bukuId: string;
  status: string;
};

export const dummyPeminjaman: Array<DummyPeminjamanType> = [
  // Ahmad Santoso
  {
    id: 'trx001',
    userId: 'usr001',
    bukuId: 'b5k3R9pL42',
    tanggalPinjam: '2023-05-15',
    tanggalJatuhTempo: '2023-05-29',
    tanggalPengembalian: '2023-05-20', // Kembali dalam 5 hari
    status: 'returned'
  },
  {
    id: 'trx002',
    userId: 'usr001',
    bukuId: 'XyZ12aBc78',
    tanggalPinjam: '2023-06-01',
    tanggalJatuhTempo: '2023-06-15',
    tanggalPengembalian: '2023-05-20',
    status: 'borrowed'
  },

  // Budi Setiawan
  {
    id: 'trx003',
    userId: 'usr002',
    bukuId: 'Gt7hJkLmN3',
    tanggalPinjam: '2023-06-10',
    tanggalJatuhTempo: '2023-06-24',
    tanggalPengembalian: '2023-06-20', // Kembali dalam 10 hari
    status: 'returned'
  },
  {
    id: 'trx004',
    userId: 'usr002',
    bukuId: 'Qw3RtYu10P',
    tanggalPinjam: '2023-07-05',
    tanggalJatuhTempo: '2023-07-19',
    tanggalPengembalian: '2023-07-25', // Kembali terlambat 6 hari
    status: 'returned'
  },

  // Citra Dewi
  {
    id: 'trx005',
    userId: 'usr003',
    bukuId: 'Zx9cV8bNm4',
    tanggalPinjam: '2023-07-12',
    tanggalJatuhTempo: '2023-07-26',
    tanggalPengembalian: '2023-05-20',
    status: 'borrowed'
  },
  {
    id: 'trx006',
    userId: 'usr003',
    bukuId: 'Kj7HgbnDf3',
    tanggalPinjam: '2023-08-01',
    tanggalJatuhTempo: '2023-08-15',
    tanggalPengembalian: '2023-08-03', // Kembali dalam 2 hari
    status: 'returned'
  },

  // Dian Pratama
  {
    id: 'trx007',
    userId: 'usr004',
    bukuId: 'Mp09oLkIj8',
    tanggalPinjam: '2023-09-05',
    tanggalJatuhTempo: '2023-09-19',
    tanggalPengembalian: '2023-05-20',
    status: 'borrowed'
  },
  {
    id: 'trx008',
    userId: 'usr004',
    bukuId: 'AbC12dEf34',
    tanggalPinjam: '2023-09-10',
    tanggalJatuhTempo: '2023-09-24',
    tanggalPengembalian: '2023-09-24', // Kembali tepat waktu
    status: 'returned'
  },

  // Eko Nugroho
  {
    id: 'trx009',
    userId: 'usr005',
    bukuId: 'Nop56QrSt7',
    tanggalPinjam: '2023-10-02',
    tanggalJatuhTempo: '2023-10-16',
    tanggalPengembalian: '2023-10-05', // Kembali dalam 3 hari
    status: 'returned'
  },
  {
    id: 'trx010',
    userId: 'usr005',
    bukuId: 'XyZ12aBc78',
    tanggalPinjam: '2023-10-15',
    tanggalJatuhTempo: '2023-10-29',
    tanggalPengembalian: '2023-05-20',
    status: 'borrowed'
  }
];
