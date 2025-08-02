type WelcomeProps = {
    title: string;
    subtitle: string;
};

export default function Welcome({ title, subtitle }: WelcomeProps) {
    return(
        <>
        <div className="w-full h-auto py-12 md:h-[300px] mt-16 md:mt-[84px] flex items-center justify-center 
        bg-[#F0F2BD]">
            <div className="text-center w-full px-4 md:w-[887px] flex flex-col items-center gap-6 
            md:gap-[32px] font-planewalker">
                <h1 className="font-semibold text-4xl md:text-[64px] text-neutral-black leading-tight 
                md:leading-[1.2]">
                    {title}
                </h1>
                <h2 className="text-gray-600 text-2xl md:text-[42px] leading-snug md:leading-[1.3]">
                    {subtitle}
                </h2>
            </div>
        </div>
        </>
    )
}