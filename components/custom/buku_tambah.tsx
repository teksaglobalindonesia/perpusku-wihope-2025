
export const Tambah_buku = () => {
    return (
        <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold mb-8 pb-4">✏️ Tambah Data Buku</h1>

            <form className="space-y-6">
                <div>
                    <label htmlFor="judul" className="block text-sm font-medium text-gray-700 mb-1">Judul Buku</label>
                    <input
                        type="text"
                        id="judul"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#5bbd87] focus:outline-none"
                        placeholder="Masukkan judul buku"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="penulis" className="block text-sm font-medium text-gray-700 mb-1">Penulis</label>
                    <input
                        type="text"
                        id="penulis"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#5bbd87] focus:outline-none"
                        placeholder="Nama penulis"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="penerbit" className="block text-sm font-medium text-gray-700 mb-1">Penerbit</label>
                    <input
                        type="text"
                        id="penerbit"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#5bbd87] focus:outline-none"
                        placeholder="Nama penerbit"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="tahun" className="block text-sm font-medium text-gray-700 mb-1">Tahun Terbit</label>
                    <input
                        type="number"
                        id="tahun"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#5bbd87] focus:outline-none"
                        placeholder="Contoh: 2023"
                        required
                    />
                </div>

                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Kategori</label>
                        <button
                            type="button"
                            className="text-sm text-[#96742C] hover:underline"
                        >
                            + Tambah Kategori
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {["Romantis", "Horror", "Komedi", "Boy Love"].map((genre) => (
                            <label key={genre} className="flex items-center space-x-2 bg-[#f3f0e8] px-3 py-1 rounded-full cursor-pointer hover:bg-[#dfd8c8] transition">
                                <input type="checkbox" className="accent-[#96742C]" />
                                <span className="text-sm">{genre}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="stok" className="block text-sm font-medium text-gray-700 mb-1">Jumlah Stok</label>
                    <input
                        type="number"
                        id="stok"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#5bbd87] focus:outline-none"
                        placeholder="Contoh: 10"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cover Buku</label>
                    <button
                        type="button"
                        className="bg-[#d6c6a1] hover:bg-[#c2b68e] text-sm px-4 py-2 rounded-md transition"
                    >
                        + Tambah Gambar
                    </button>
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        className="bg-[#5bbd87] text-white px-5 py-2 rounded-lg shadow hover:bg-[#4a996d] transition"
                    >
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    );
};