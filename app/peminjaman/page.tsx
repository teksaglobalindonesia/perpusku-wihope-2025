
import { PPeminjaman } from "@/components/custom/PPeminjaman"
import Link from "next/link"
export default function Page() {
  return (
  <>
  <div className="min-h-screen bg-beige-50 px-8 py-8">
      {/* Header Section */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h1 className="font-vintage text-3xl font-semibold text-vintage-brown md:text-[32px]">
          Peminjaman
        </h1>

        {/* Search and Add Button */}
        <div className="flex w-full flex-col items-center gap-4 sm:flex-row md:w-auto">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-sm border-2 border-beige-300 bg-beige-100 px-4 py-2 font-vintage
                      italic text-beige-700 placeholder-beige-400 shadow-inner transition-colors
                      duration-200 focus:border-beige-400 focus:bg-white 
                      focus:outline-none sm:w-48"
          />
          <Link href="/peminjaman/addPeminjaman">
            <button
              className="w-full rounded-md border border-vintage-sage bg-vintage-sage px-6 py-2 font-vintage
                          text-beige-100 shadow-md transition-colors duration-300
                          hover:bg-vintage-sage/90 sm:w-auto"
            >
              TAMBAH
            </button>
          </Link>
        </div>
      </div>

      {/* Content Section */}
      <div className="rounded-xl border border-beige-200 bg-beige-100 p-6 shadow-inner">
        <PPeminjaman/>
      </div>
    </div>
  </>
  )
}