export default function Goodbye(){
    return(
        <>
        <div className="w-full h-auto min-h-[200px] md:h-[300px] flex items-center justify-center 
        bg-[#F0F2BD] py-8">
            <div className="text-center w-full px-4 md:w-[887px] flex flex-col items-center gap-4 
            md:gap-[32px] font-planewalker">
                <h1 className="font-semibold text-3xl sm:text-4xl md:text-[64px] text-neutral-black leading-tight">
                    Thank you For Coming
                </h1>
                <h2 className="text-gray-600 text-lg sm:text-xl md:text-[42px] px-2 
                leading-snug md:leading-[1.3]">
                    Don't forget to return the books...
                    <br className="md:hidden"/> 
                    or we'll send someone to take you down
                </h2>
            </div>
        </div>
        </>
    )
}