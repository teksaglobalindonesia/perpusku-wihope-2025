type CardProps = {
  cardItems?: Array<{
    title?: string;
    peminjam?: string;
    peminjaman?: string;
    pengembalian?: string;
    dikembalikan?: string;
    label?: 'dipinjam' | 'terlambat' | 'dikembalikan';
    showButton?: boolean;
  }>;
};

export const Card = ({ ...props }: CardProps) => {
  return (
    <div className="grid gap-4 md:gap-6">
      {props.cardItems?.map((item, index) => (
        <div
          key={index}
          className="flex flex-col overflow-hidden rounded-xl border border-beige-300 bg-beige-50 shadow-md shadow-beige-200/50 transition-all hover:shadow-lg hover:shadow-beige-300/30 sm:flex-row"
        >
          {/* Content */}
          <div className="flex-1 p-4 sm:p-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-vintage-brown sm:text-xl">
                {item.title}
              </h3>
              
              <div className="grid gap-2 text-sm sm:text-base">
                {item.peminjam && (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                    <span className="min-w-[90px] font-medium text-beige-800">
                      Peminjam:
                    </span>
                    <span>{item.peminjam}</span>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <span className="min-w-[90px] font-medium text-beige-800">
                    Pinjaman:
                  </span>
                  <span>{item.peminjaman}</span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <span className="min-w-[90px] font-medium text-beige-800">
                    Pengembalian:
                  </span>
                  <span>{item.pengembalian}</span>
                </div>
                
                {item.dikembalikan && (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                    <span className="min-w-[90px] font-medium text-beige-800">
                      Dikembalikan:
                    </span>
                    <span>{item.dikembalikan}</span>
                  </div>
                )}
              </div>
              
              {(item.label === 'dipinjam' || (item.label === 'terlambat' && item.showButton !== false)) && (
                <button className="mt-3 w-full rounded-md bg-vintage-sage px-4 py-2 font-vintage text-sm font-medium text-white transition-all hover:bg-vintage-sage/70 sm:w-36">
                  Kembalikan
                </button>
              )}
            </div>
          </div>

          {/* Label */}
          {item.label && (
            <div className="flex items-center justify-between border-t p-4 sm:flex-col sm:justify-center sm:border-l sm:border-t-0">
              <span className="font-medium sm:hidden">Status:</span>
              <span
                className={`inline-flex h-8 items-center justify-center rounded-md px-3 py-1 font-vintage text-xs font-medium sm:h-10 sm:text-sm
                  ${
                    item.label === 'dipinjam'
                      ? 'border border-vintage-sage bg-vintage-sage/20 text-vintage-sage'
                      : item.label === 'terlambat'
                      ? 'border border-vintage-terracotta bg-vintage-terracotta/10 text-vintage-terracotta'
                      : 'border border-beige-400 bg-beige-200/50 text-beige-700'
                  }`}
              >
                {item.label.toUpperCase()}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};