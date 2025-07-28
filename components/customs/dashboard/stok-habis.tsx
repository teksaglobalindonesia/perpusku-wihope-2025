import Image from "next/image";

export default function Habis(){
    const bukuhabis =[
        {
            id: 1,
            title: "Mixed Unit Tactics",
            category: "History",
            author: "Codus Callonus",
            image: "/image/Mixed Unit.jpg",
            stok: 0
        },
        
        {
            id: 2,
            title: "The Rise and Fall of the Blades",
            category: "History",
            author: "Anonymous",
            image: "/image/Rise blades book.png",
            stok: 0
        }
    ]

    return (
        <>
        <div className="w-full bg-[#FFEAC5]">
            <div className="w-full px-4 md:px-[64px] py-6">
                <h1 className="text-2xl md:text-3xl font-semibold font-planewalker text-gray-900 mb-4">Dashboard</h1>
                <div className="w-full border-2 md:border-4 rounded-md px-2 md:px-3 py-3 md:py-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between font-morrisroman gap-2 md:gap-0">
                        <h1 className="text-lg md:text-xl font-semibold">Out of Stock Book</h1>
                        <button className="px-4 md:px-8 border-2 md:border-4 rounded-md text-base md:text-lg w-full md:w-auto">Search...</button>
                    </div>
                    <div className="w-full flex flex-col gap-3 md:gap-4 mt-3 md:mt-5">
                        {bukuhabis.map((book) => (
                            <div key={book.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-2 md:border-4 rounded-md p-2 md:p-4 gap-2">
                                <div className="flex flex-col sm:flex-row gap-3 md:gap-7 items-start sm:items-center w-full">
                                    <div className="relative w-12 h-12 md:w-16 md:h-16">
                                        <Image 
                                            src={book.image} 
                                            alt={book.title} 
                                            fill 
                                            quality={100} 
                                            className="object-contain" 
                                        />
                                    </div>
                                    <div className="text-base md:text-lg font-cyrodiil">
                                        <h1 className="font-semibold line-clamp-1">{book.title}</h1>
                                        <h2 className="line-clamp-1">{book.category}</h2>
                                        <h3 className="line-clamp-1">by {book.author}</h3>
                                    </div>
                                </div>
                                {book.stok === 0 && (
                                    <div className="sm:ml-auto bg-red-600 text-white px-3 py-1 md:px-4 md:py-2 clip-custom text-sm md:text-lg font-cyrodiil w-full sm:w-auto text-center">
                                        Unavailable
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    <div className="flex items-center justify-center gap-1 md:gap-2 font-morrisroman text-base md:text-xl mt-2">
                        <button className="px-2">←</button>
                        <button className="px-2">1</button>
                        <button className="px-2">2</button>
                        <button className="px-2">3</button>
                        <button className="px-2">→</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}