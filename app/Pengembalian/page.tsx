import { Navbar } from "@/components/custom/navbar";

export default function PengembalianPage () {
    return(
        <>
        <Navbar/>
        <div className="p-6 bg-neutral-white min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text text-neutral-dbrown font-bold font-inter text-[32px]">
                    Pengembalian
                </h1>
            </div>
        </div>
        </>
    )
}