import Image from 'next/image';

export type HeaderProps = {
    items?:Array<{
        text?: string;
        link?: string;
    }>;
};

export default function Header({...props}: HeaderProps) {
  return (
    <div className="flex flex-row justify-between bg-[#393E46] items-center">
      <div className="flex flex-row pl-4">
        <Image
          src="/image/logo.png"
          alt="Logo Perpusku"
          width={80}
          height={90}
          className=""
        />
        <h1 className="font-playwrite flex items-center text-2xl text-[#DFD0B8] hover:text-[#948979]">
          Perpusku
        </h1>
      </div>
      <div>
        <div className="flex flex-row">
          {props.items?.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="text-[#DFD0B8] hover:text-[#948979] text-sm font-playwrite px-4 py-2 mr-2"
            >
              {item.text}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
