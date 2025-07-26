import Link from "next/link";

export default function TambahMemb(){
    return(
        <>
        <div className="w-full px-4 md:px-[64px] mt-16 md:mt-[84px] bg-[#FFEAC5] pb-6">
            <div className="w-full flex justify-center items-center py-6 md:py-8">
                <h1 className="font-morrisroman text-2xl md:text-3xl font-semibold text-center">
                    Add a New Member
                </h1>
            </div>
            <div className="w-full px-4 md:px-[64px] py-5 bg-[#6C4E31] rounded-lg text-white font-cyrodiil text-base md:text-lg">
                <div className="w-full px-2 md:px-4">
                    <div className="py-2">
                        <label>NIM</label>
                        <input 
                            type="text" 
                            className="w-full mt-2 md:mt-4 py-2 px-3 border-2 rounded-md text-black" 
                            placeholder="Enter your NIM" 
                        />
                    </div>
                    <div className="py-2">
                        <label>Name</label>
                        <input 
                            type="text" 
                            className="w-full mt-2 md:mt-4 py-2 px-3 border-2 rounded-md text-black" 
                            placeholder="Enter your Name" 
                        />
                    </div>
                    <div className="py-2">
                        <label>Email</label>
                        <input 
                            type="email" 
                            className="w-full mt-2 md:mt-4 py-2 px-3 border-2 rounded-md text-black" 
                            placeholder="Enter your Email" 
                        />
                    </div>
                    <div className="py-2">
                        <label>Address</label>
                        <input 
                            type="text" 
                            className="w-full mt-2 md:mt-4 py-2 px-3 border-2 rounded-md text-black" 
                            placeholder="Enter your Address" 
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 py-4">
                        <Link 
                            href="/anggota" 
                            className="bg-[#F0F2BD] hover:bg-[#F2C078] duration-300 text-black py-2 px-4 clip-custom text-center"
                        >
                            ← Back
                        </Link>
                        <button 
                            className="bg-[#F0F2BD] hover:bg-[#F2C078] duration-300 text-black py-2 px-4 clip-custom"
                        >
                            Save Member
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}