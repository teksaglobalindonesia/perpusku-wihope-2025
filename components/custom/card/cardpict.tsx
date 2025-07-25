"use client";
import Image from "next/image";

type Props = {
  title: string;
  genre?: string;
  author?: string;
  img?: string;
};

export const CardPict = ({ title, genre, author, img }: Props) => {
  return (
    <div className="flex gap-4 items-start w-full">
      {img && (
        <Image src={img} alt={title} width={114} height={171} className="rounded-md" />
      )}
      <div>
        <h3 className="text-neutral-dbrown font-semibold text-[20px] font-inter">{title}</h3>
        <p className="text-[14px] font-semibold text-neutral-mbrown mt-1">
          Genre: <span className="font-medium">{genre}</span><br />
          Penulis: <span className="font-medium">{author}</span>
        </p>
      </div>
    </div>
  );
};
