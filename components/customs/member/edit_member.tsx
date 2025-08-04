import Link from "next/link";

export default function EditMemb(){
    return(
        <>
        <div className="w-full px-4 md:px-[64px] mt-6 md:mt-[84px] bg-[#FFEAC5] pb-6">
            <div className="w-full flex justify-center items-center py-4 md:py-8">
                <h1 className="font-morrisroman text-2xl md:text-3xl font-semibold">
                    Edit a Member
                </h1>
            </div>
            <div className="w-full px-4 md:px-[64px] py-4 md:py-5 bg-[#6C4E31] rounded-lg 
            text-white font-cyrodiil text-base md:text-lg">
                <div className="w-full px-2 md:px-4">
                    <div className="py-2 md:py-3">
                        <label>
                            NIM
                        </label>
                        <br />
                        <input 
                            type="text" 
                            className="w-full mt-2 md:mt-4 py-1 px-2 border-2 rounded-md text-black" 
                            placeholder="Enter your NIM" 
                        />
                    </div>

                    <div className="py-2 md:py-3">
                        <label>
                            Name
                        </label>
                        <br />
                        <input 
                            type="text" 
                            className="w-full mt-2 md:mt-4 py-1 px-2 border-2 rounded-md text-black" 
                            placeholder="Enter your Name" 
                        />
                    </div>

                    <div className="py-2 md:py-3">
                        <label>
                            Email
                        </label>
                        <br />
                        <input 
                            type="email" 
                            className="w-full mt-2 md:mt-4 py-1 px-2 border-2 rounded-md text-black" 
                            placeholder="Enter your Email" 
                        />
                    </div>

                    <div className="py-2 md:py-3">
                        <label>
                            Address
                        </label>
                        <br />
                        <input 
                            type="text" 
                            className="w-full mt-2 md:mt-4 py-1 px-2 border-2 rounded-md text-black" 
                            placeholder="Enter your Address" 
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-6">
                        <Link href="/anggota" className="bg-[#F0F2BD] hover:bg-[#F2C078] 
                        duration-300 text-black py-2 px-4 clip-custom text-center">
                            ← Back
                        </Link>
                        <button className="bg-[#F0F2BD] hover:bg-[#F2C078] duration-300 
                        text-black py-2 px-4 clip-custom">
                            Save Member
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}