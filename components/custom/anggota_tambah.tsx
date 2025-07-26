
export const Tambah_anggota = () => {
    return (
        <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-[#000000] mb-8 pb-4">✏️ Tambah Anggota</h1>

            <form className="space-y-6">
                <div>
                    <label htmlFor="nomor" className="block text-sm font-medium text-gray-700 mb-1">Nomor</label>
                    <input
                        type="text"
                        id="nomor"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#5bbd87] focus:outline-none"
                        placeholder="Masukkan Nomor"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                    <input
                        type="text"
                        id="nama"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#5bbd87] focus:outline-none"
                        placeholder="Masukkan Nama"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="text"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#5bbd87] focus:outline-none"
                        placeholder="Masukkan Email"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="alamat" className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                    <input
                        type="text"
                        id="alamat"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#5bbd87] focus:outline-none"
                        placeholder="Masukkan Alamat"
                        required
                    />
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