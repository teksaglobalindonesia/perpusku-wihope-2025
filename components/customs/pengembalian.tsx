export default function Pengembali(){
    const pengembalian = [
        {
            id: 1,
            title: "Songs of Skyrim",
            peminjam: "Mikael",
            peminjaman: "10 May 1435, 10.00",
            pengembalian: "17 May 1435",
            status: "Dikembalikan"
        },

        {
            id: 2,
            title: "Spirit of Nirn",
            peminjam: "Akatosh",
            peminjaman: "24 October 68, 13.54",
            pengembalian: "31 October 68",
            status: "Dikembalikan"
        }
    ]
    return(
        <>
        <div className="w-full bg-[#FFEAC5] px-4 sm:px-8 md:px-[64px] py-6 md:py-[40px]">
            <div className="w-full border-2 md:border-4 rounded-md px-3 py-4 md:py-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between font-morrisroman gap-3 sm:gap-0 mb-4 sm:mb-0">
                    <h1 className="text-lg sm:text-xl font-semibold">Today's Returns</h1>
                    <button className="px-4 sm:px-8 border-2 sm:border-4 rounded-md text-sm sm:text-lg w-full sm:w-auto">
                        Search...
                    </button>
                </div>
                {pengembalian.map((kembali) => (
                    <div key={kembali.id} className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between border-2 sm:border-4 rounded-md p-3 sm:p-4 mt-3 sm:mt-5">
                        <div className="flex flex-col sm:flex-row sm:gap-7 w-full">
                            <div className="text-sm sm:text-lg font-cyrodiil space-y-1 sm:space-y-0">
                                <h1 className="font-semibold line-clamp-1">{kembali.title}</h1>
                                <h2 className="line-clamp-1 text-gray-600">Borrower: {kembali.peminjam}</h2>
                                <h3 className="line-clamp-1 text-gray-600">Borrowing: {kembali.peminjaman}</h3>
                                <h4 className="line-clamp-1 text-gray-600">Returning: {kembali.pengembalian}</h4>
                            </div>
                        </div>
                        
                        {kembali.status === "Dikembalikan" && (
                            <div className="sm:ml-auto bg-green-500 text-white px-3 py-1 sm:px-4 sm:py-2 clip-custom text-xs sm:text-lg font-cyrodiil w-full sm:w-auto text-center mt-2 sm:mt-0">
                                Returning
                            </div>
                        )}
                    </div>
                ))}
                <div className="flex items-center justify-center gap-1 sm:gap-2 font-morrisroman text-sm sm:text-xl mt-4 sm:mt-5">
                    <button className="px-1 sm:px-2">←</button>
                    <button className="px-1 sm:px-2">1</button>
                    <button className="px-1 sm:px-2">2</button>
                    <button className="px-1 sm:px-2">3</button>
                    <button className="px-1 sm:px-2">→</button>
                </div>
            </div>
        </div>
        </>
    )
}