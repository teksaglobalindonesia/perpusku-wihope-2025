export const B_EditBook = () => {
    return (
        <div className="flex flex-col mx-10 my-10 border-2 border-gray-200 rounded-lg shadow-md bg-white">
            <div className="flex flex-row justify-between py-5 px-6 items-center border-b border-gray-200">
                <h3 className="font-semibold text-2xl text-gray-800">Tambah Buku</h3>
            </div>

            <div className="px-6 py-6">
                <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="title" className="text-sm font-medium text-gray-700">
                                Judul
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                className="w-full h-10 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                placeholder="Masukkan judul buku"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="author" className="text-sm font-medium text-gray-700">
                                Penulis
                            </label>
                            <input
                                type="text"
                                name="author"
                                id="author"
                                className="w-full h-10 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                placeholder="Masukkan nama penulis"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="publisher" className="text-sm font-medium text-gray-700">
                                Penerbit
                            </label>
                            <input
                                type="text"
                                name="publisher"
                                id="publisher"
                                className="w-full h-10 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                placeholder="Masukkan nama penerbit"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="year" className="text-sm font-medium text-gray-700">
                                Tahun Terbit
                            </label>
                            <input
                                type="number"
                                name="year"
                                id="year"
                                className="w-full h-10 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                placeholder="2024"
                            />
                        </div>
                    </div>

                    <div className="space-y-4 flex flex-col gap-5">
                        <label className="text-sm font-medium text-gray-700">
                            Kategori
                        </label>
                        <button
                            className="bg-yellow-300 hover:bg-yellow-400 text-primary-dark  w-40 py-3 rounded-md font-medium transition-all duration-200  shadow-sm hover:shadow-md">
                            Tambah Kategori
                        </button>
                        <div className="grid grid-cols-10 gap-4">

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    name="genre"
                                    id=""
                                    value=""
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <label
                                    htmlFor=""
                                    className="text-sm text-gray-700 cursor-pointer">Fiksi</label>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    name="genre"
                                    id=""
                                    value=""
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <label
                                    htmlFor=""
                                    className="text-sm text-gray-700 cursor-pointer">Fiksi</label>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    name="genre"
                                    id=""
                                    value=""
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <label
                                    htmlFor=""
                                    className="text-sm text-gray-700 cursor-pointer">Fiksi</label>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    name="genre"
                                    id=""
                                    value=""
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <label
                                    htmlFor=""
                                    className="text-sm text-gray-700 cursor-pointer">Fiksi</label>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="stock" className="text-sm font-medium text-gray-700">
                                Stok
                            </label>
                            <input
                                type="number"
                                name="stock"
                                id="stock"
                                className="w-full h-10 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                placeholder="0"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="image" className="text-sm font-medium text-gray-700">
                                Gambar Cover
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    accept="image/*"
                                    className="w-full h-10 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 file:mr-4 file:h-full file:px-4 file:border-0 file:text-sm file:font-medium file:bg-blue-200 file:text-blue-500 hover:file:bg-blue-100"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4 border-t border-gray-200 gap-3">
                        <button
                            type="submit"
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            Hapus Buku
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            Simpan Buku
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};