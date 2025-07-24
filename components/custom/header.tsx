'use client';

import { usePathname } from 'next/navigation';

export type headerProps = {
  navItems?: Array<{
    label: string;
    path: string;
  }>;
};

export const Header = ({ ...props }: headerProps) => {
  const pathname = usePathname();
  return (
    <header className="border-b border-beige-300 bg-beige-800 px-8 py-4 shadow-md shadow-beige-900/20">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <h1 className="font-vintage text-3xl font-semibold text-beige-100">
          Perpusku
        </h1>

        {/* Navigation Items */}
        <nav className="flex gap-2">
          {props.navItems?.map((item, index) => {
            const isActive = pathname === item.path;
            return (
            <a
              key={index}
              href={item.path}
              className={`rounded-md px-4 py-2 font-vintage transition-all duration-300
                  ${
                    isActive
                      ? 'bg-beige-700 font-medium text-beige-50' 
                      : 'text-beige-100 hover:bg-beige-700/80 hover:text-beige-50' 
                  }
                  focus:outline-none focus:ring-2 focus:ring-beige-500 focus:ring-offset-2 focus:ring-offset-beige-800`}
            >
              {item.label}
              {isActive && (
                <span className='ml-1.5 inline-block h-1 w-1 rounded-full bg-beige-300'></span>
              )}
            </a>
            )
          })}
        </nav>
      </div>
    </header>
  );
};
