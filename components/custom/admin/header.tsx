import Link from 'next/link';

export type D_HeaderProps = {
    items?: Array<{
        link?: string;
        label?: string;
    }>
};

export const D_Header = ({ ...props }: D_HeaderProps) => {
    return (
        <div className="flex flex-fow justify-between items-center bg-primary-light py-4 px-8 shadow-md">
            <div className="font-semibold text-2xl text-primary-dark">
                <h1>PERPUSKU</h1>
            </div>
            <div className="text-primary-dark flex flex-row">
                {props.items?.map((item, index) => (
                    <Link key={index} href={item.link || ''} className='py-1 px-4'>{item.label}</Link>
                ))}
            </div>
        </div>
    );
}