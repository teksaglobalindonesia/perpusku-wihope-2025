export default function Pinjaman() {
    const pinjaman = [
        {
            id: 1,
            title: "The Lusty Argonian Maid v.1",
            peminjam: "Anton",
            peminjaman: "17 July 1467, 09.35",
            pengembalian: "24 July 1467"
        },

        {
            id: 2,
            title: "Solitude Home Decorating Guide",
            peminjam: "Alduin",
            peminjaman: "29 August 658, 17.45",
            pengembalian: "5 September 658"
        }
    ]
    return(
        <>
        <div className="w-full bg-[#FFEAC5] px-4 sm:px-8 md:px-[64px] py-6 md:py-[40px]">
            <div className="w-full border-2 md:border-4 rounded-md px-3 py-4 md:py-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between font-morrisroman gap-3 sm:gap-0">
                    <h1 className="text-lg sm:text-xl font-semibold">Today's borrowings</h1>
                    <button className="px-4 sm:px-8 border-2 sm:border-4 rounded-md text-sm sm:text-lg w-full sm:w-auto">
                        Search...
                    </button>
                </div>
                {pinjaman.map((pinjam) => (
                    <div key={pinjam.id} className="w-full flex flex-col sm:flex-row sm:items-center justify-between border-2 sm:border-4 rounded-md p-3 sm:p-4 mt-4 sm:mt-5">
                        <div className="flex flex-col sm:gap-7 w-full">
                            <div className="text-sm sm:text-lg font-cyrodiil space-y-1 sm:space-y-2">
                                <h1 className="font-semibold line-clamp-1">{pinjam.title}</h1>
                                <h2 className="line-clamp-1 text-gray-700">Borrower: {pinjam.peminjam}</h2>
                                <h3 className="line-clamp-1 text-gray-700">Borrowing: {pinjam.peminjaman}</h3>
                                <h4 className="line-clamp-1 text-gray-700">Returning: {pinjam.pengembalian}</h4>
                            </div>
                        </div>
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