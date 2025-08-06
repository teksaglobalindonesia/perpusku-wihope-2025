export const dateFormat = (tanggalStr: string) => {
  const tanggal = new Date(tanggalStr);
  const formatter = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  return formatter.format(tanggal);
};
