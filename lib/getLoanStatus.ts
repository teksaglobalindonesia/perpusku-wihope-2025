export const getLoanStatus = (data: {
  return_date: string;
  return?: {
    actual_return_date: string;
  };
}): 'dikembalikan' | 'terlambat' | 'dipinjam' => {
  const today = new Date();
  const returnDate = new Date(data?.return_date);

  if (data?.return) {
    return 'dikembalikan';
  }

  if (!data?.return && returnDate < today) {
    return 'terlambat';
  }

  return 'dipinjam';
};
