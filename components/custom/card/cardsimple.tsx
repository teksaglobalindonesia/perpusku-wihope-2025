
"use client";

type Props = {
  title: string;
  borrower?: string;
  borrowedAt?: string;
  returnAt?: string;
};

export const CardSimple = ({ title, borrower, borrowedAt, returnAt }: Props) => {
  return (
    <div className="flex gap-4 items-start w-full">
      <div>
        <h3 className="text-neutral-dbrown font-semibold text-[20px] font-inter">{title}</h3>
        <p className="text-[14px] font-medium text-neutral-mbrown mt-1 leading-relaxed">
          Peminjam: {borrower} <br />
          Peminjaman: {borrowedAt} <br />
          Pengembalian: {returnAt}
        </p>
      </div>
    </div>
  );
};
