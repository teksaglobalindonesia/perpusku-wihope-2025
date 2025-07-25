import Link from 'next/link';

export type NavLinkHeadeDataTypes = {
  label: string;
  href: string;
};

export const Header = ({
  title = '',
  navLinks = []
}: {
  title: string;
  navLinks: Array<NavLinkHeadeDataTypes>;
}) => {
  return (
    <header className="flex h-[80px] w-full items-center justify-between bg-neutral-silver px-[5%]">
      <div>
        <h1 className="text-[20px] font-bold text-brand-primary">Perpus Ku</h1>
      </div>
      <div className="flex gap-[5px]">
        {navLinks.map((data: NavLinkHeadeDataTypes, i: number) => (
          <Link
            href={data.href}
            className="rounded-sm px-4 py-2 font-semibold hover:bg-brand-primary hover:text-neutral-silver"
            key={i}
          >
            {data.label}
          </Link>
        ))}
      </div>
    </header>
  );
};
