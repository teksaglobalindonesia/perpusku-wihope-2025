import Image from "next/image";

export default function Footer(){
    return(
        <>
        <div className="bg-[#4B352A] font-morrisroman text-white py-8 md:py-0">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-[165px] flex flex-col 
            md:flex-row justify-between items-center">
                <div className="w-full md:w-[350px] mb-8  md:mb-[74.33px] flex flex-col 
                items-center md:items-start">
                    <div className="flex items-center">
                        <div className="relative w-20 h-20 md:w-[100px] md:h-[100px]">
                        <Image 
                            src="/image/Header_logo (3).png" 
                            alt="h_logo" 
                            fill    
                            quality={100} 
                            className="object-contain"
                        />
                        </div>
                        <h1 className="text-xl md:text-2xl pl-2 font-semibold text-white font-planewalker">
                        Imperial Library
                        </h1>
                    </div>
                    <p className="text-sm md:text-lg pt-2 md:pt-0 md:pb-[8px] text-center md:text-left">
                        Copyright © 45 East Empire Company
                    </p>
                    <p className="text-sm md:text-lg text-center md:text-left">
                        All rights reserved
                    </p>
                    <p className="text-sm md:text-lg text-center md:text-left">
                        Imperial City, Province of Cyrodiil
                    </p>
                </div>
                <div className="w-full md:w-auto flex justify-center md:justify-end md:ml-12 lg:ml-24 xl:ml-32">
                    <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 md:gap-[60px]">
                        <div className="my-4 md:my-[64px] w-[160px]">
                            <h4 className="text-base md:text-[20px] font-semibold mb-4 md:mb-[24px] 
                            text-center sm:text-left">
                                Company
                            </h4>
                            <ul className="text-sm md:text-[16px] space-y-2 md:space-y-[12px] text-gray-300">
                                <li className="cursor-pointer hover:underline text-center sm:text-left">
                                    About us
                                </li>
                                <li className="cursor-pointer hover:underline text-center sm:text-left">
                                    Books
                                </li>
                                <li className="cursor-pointer hover:underline text-center sm:text-left">
                                    Member
                                </li>
                                <li className="cursor-pointer hover:underline text-center sm:text-left">
                                    Borrowing
                                </li>
                                <li className="cursor-pointer hover:underline text-center sm:text-left">
                                    Returning
                                </li>
                            </ul>
                        </div>
                        <div className="my-4 md:my-[64px] w-[160px]">
                            <h4 className="text-base md:text-[20px] font-semibold mb-4 md:mb-[24px] 
                            text-center sm:text-left">
                                Support
                            </h4>
                            <ul className="text-sm md:text-[16px] space-y-2 md:space-y-[12px] text-gray-300">
                                <li className="cursor-pointer hover:underline text-center sm:text-left">
                                    Help center
                                </li>
                                <li className="cursor-pointer hover:underline text-center sm:text-left">
                                    Terms of service
                                </li>
                                <li className="cursor-pointer hover:underline text-center sm:text-left">
                                    Legal
                                </li>
                                <li className="cursor-pointer hover:underline text-center sm:text-left">Privacy policy</li>
                                <li className="cursor-pointer hover:underline text-center sm:text-left">Status</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}