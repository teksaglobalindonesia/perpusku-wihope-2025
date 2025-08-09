export type FooterProps = {
  items?: Array<{
    text?: string;
    link?: string;
  }>
}

export default function Footer({...props}:FooterProps) {
  return (
    <footer className="mt-10 bg-[#222831] text-sm text-[#DFD0B8]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between border-t border-[#393E46] px-4 py-6 sm:flex-row">
        <p className="mb-2 text-[#948979] sm:mb-0">
          © {new Date().getFullYear()} Perpusku. All rights reserved.
        </p>
        <div className="flex space-x-4 text-[#948979]">
           {props.items?.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="transition-colors hover:text-[#DFD0B8]"
            >
              {item.text}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
