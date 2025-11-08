'use client';
import Link from 'next/link';
import { useState } from 'react';

export type NavLinkHeadeDataTypes = {
  label: string;
  href: string;
};

const NavDatas: Array<NavLinkHeadeDataTypes> = [
  {
    label: 'Dashboard',
    href: '/'
  },
  {
    label: 'Buku',
    href: '/book'
  },
  {
    label: 'Anggota',
    href: '/member'
  },
  {
    label: 'Peminjaman',
    href: '/loan'
  },
  {
    label: 'Pengembalian',
    href: '/return'
  }
];

export const Header = ({ title = '' }: { title: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="fixed top-0 z-10 flex h-[80px] w-full bg-neutral-silver shadow-2xl">
        {/* desktop */}
        <div className="flex h-full w-full items-center justify-between px-[3%]">
          <h1 className="text-[20px] font-bold text-neutral-dgray">
            Perpus Ku
          </h1>
          {/* desktop */}
          <div className="hidden gap-[30px] md:flex">
            {NavDatas?.map((data: any, i: number) => (
              <Link
                key={i}
                href={data?.href}
                className="font-semibold text-neutral-dgray"
              >
                {data.label}
              </Link>
            ))}
          </div>

          {/* humberger btn */}
          <div className="block md:hidden">
            <img
              src={isOpen ? 'icons/close.svg' : `icons/menu.svg`}
              alt="gak ada"
              className="w-[35px]"
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </div>
        <>
          {/* mobile */}
          <div
            className={`absolute left-0 top-[79px] flex w-full ${
              isOpen ? 'h-[350px]' : 'h-0'
            } w-full flex-col justify-center gap-[15px] overflow-hidden bg-neutral-silver shadow-xl transition-all duration-700 md:hidden`}
          >
            {NavDatas?.map((data: any, i: number) => (
              <div
                className="hover:bg-whtie flex w-full items-center justify-between px-[3%] py-3"
                key={i}
              >
                <Link
                  key={i}
                  href={data?.href}
                  className="text-center text-[18px] font-semibold text-neutral-dgray"
                >
                  {data.label}
                </Link>
              </div>
            ))}
          </div>
        </>
      </div>
      <div className="h-[90px]"></div>
    </>
  );
};
