import Link from "next/link";

export default function TambahBuku(){
    return(
        <>
        <div className="w-full px-4 md:px-[64px] mt-16 md:mt-[84px] bg-[#FFEAC5] pb-6">
            <div className="w-full flex justify-center items-center py-6 md:py-8">
                <h1 className="font-morrisroman text-2xl md:text-3xl font-semibold">Add a New Book</h1>
            </div>
            <div className="w-full px-4 md:px-[64px] py-5 bg-[#6C4E31] rounded-lg text-white font-cyrodiil text-base md:text-lg">
                <div className="w-full px-2 md:px-4 py-2">
                    <div className="py-2">
                        <label>Title</label>
                        <input type="text" className="w-full mt-2 md:mt-4 py-1 border-2 rounded-md text-black" placeholder="Enter book title" />
                    </div>
                    <div className="py-2">
                        <label>Author</label>
                        <input type="text" className="w-full mt-2 md:mt-4 py-1 border-2 rounded-md text-black" placeholder="Enter author name" />
                    </div>
                    <div className="py-2">
                        <label>Publisher</label>
                        <input type="text" className="w-full mt-2 md:mt-4 py-1 border-2 rounded-md text-black" placeholder="Enter publisher" />
                    </div>
                    <div className="py-2">
                        <label>Year of Publication</label>
                        <input type="date" className="w-full mt-2 md:mt-4 py-1 border-2 rounded-md text-black" />
                    </div>
                    <div className="py-2">
                        <label className="block mb-2">Category</label>
                        <button className="px-4 bg-yellow-500 py-2 clip-custom mb-2 text-sm md:text-base">Add Category</button>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full md:w-[360px]">
                            {['History', 'Mystery', 'Comedy', 'Drama', 'Cooking', 'Arcane'].map((category) => (
                                <label key={category} className="flex items-center gap-2 text-sm md:text-base">
                                    <input type="radio" name="category" value={category} />
                                    {category}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="py-2">
                        <label>Stock</label>
                        <input type="number" className="w-full mt-2 md:mt-4 py-1 border-2 rounded-md text-black" placeholder="Enter total stock" />
                    </div>
                    <div className="py-2">
                        <label>Cover</label>
                        <input type="file" className="mt-2 md:mt-4 w-full" />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 py-4">
                        <Link href="/buku" className="bg-[#F0F2BD] hover:bg-[#F2C078] duration-300 text-black py-2 px-4 clip-custom text-center">
                            ← Back
                        </Link>
                        <button className="bg-[#F0F2BD] hover:bg-[#F2C078] duration-300 text-black py-2 px-4 clip-custom">
                            Save Book
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}