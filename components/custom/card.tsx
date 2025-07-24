type CardProps = {
  cardItems?: Array<{
    title?: string;
    peminjam?: string;
    peminjaman?: string;
    pengembalian?: string;
    label?: 'dipinjam' | 'terlambat' | 'dikembalikan';
  }>;
};

export const Card = ({ ...props }: CardProps) => {
  return (
    <div className="flex flex-col gap-4">
      {props.cardItems?.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-xl border border-beige-300 bg-beige-50 p-6 shadow-md shadow-beige-200/50 transition-all hover:shadow-lg hover:shadow-beige-300/30"
        >
          {/* Content */}
          <div className="flex flex-col gap-2 font-vintage">
            <h3 className="text-xl font-semibold text-vintage-brown">
              {item.title}
            </h3>
            <div className="space-y-1 text-beige-700">
              <p className="flex items-center gap-2">
                {item.peminjam && (
                  <span className="font-medium text-beige-800">
                    Peminjam: {item.peminjam}
                  </span>
                )}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium text-beige-800">Pinjaman:</span>
                {item.peminjaman}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium text-beige-800">
                  Pengembalian:
                </span>
                {item.pengembalian}
              </p>
            </div>
            {(item.label === 'dipinjam' || item.label === 'terlambat') && (
              <button className="transition-all w-36 rounded-md bg-vintage-sage px-4 py-2 font-vintage text-sm font-medium text-white hover:bg-vintage-sage/70 ">
                Kembalikan
              </button>
            )}
          </div>

          {/* Label */}
          {item.label && (
            <div
              className={`flex h-10 items-center justify-center rounded-md px-4 py-1 font-vintage text-sm font-medium
                  ${
                    item.label === 'dipinjam'
                      ? 'border border-vintage-sage bg-vintage-sage/20 text-vintage-sage'
                      : item.label === 'terlambat'
                      ? 'border border-vintage-terracotta bg-vintage-terracotta/10 text-vintage-terracotta'
                      : 'border border-beige-400 bg-beige-200/50 text-beige-700'
                  }`}
            >
              {item.label.toUpperCase()}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
