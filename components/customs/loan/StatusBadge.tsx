export const StatusBadge = ({
  status
}: {
  status: 'dikembalikan' | 'terlambat' | 'dipinjam';
}) => {
  const colorMap = {
    dikembalikan: 'bg-action-green text-white',
    terlambat: 'bg-action-error text-white',
    dipinjam: 'bg-brand-blue text-white'
  };

  return (
    <span
      className={`rounded-sm px-3 py-2 text-sm font-semibold ${colorMap[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
