export const M_EditMember = () => {
    return (
        <div className="flex flex-col mx-10 my-10 border-2 border-gray-200 rounded-lg shadow-md bg-white">
            <div className="flex flex-row justify-between py-5 px-6 items-center border-b border-gray-200">
                <h3 className="font-semibold text-2xl text-gray-800">Edit Anggota</h3>
            </div>

            <div className="px-6 py-6">
                <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="title" className="text-sm font-medium text-gray-700">
                                Nama
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                className="w-full h-10 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                placeholder="Azrea Natalie"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="author" className="text-sm font-medium text-gray-700">
                                UID
                            </label>
                            <input
                                type="text"
                                name="author"
                                id="author"
                                className="w-full h-10 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                placeholder="M_001"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="publisher" className="text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                name="publisher"
                                id="publisher"
                                className="w-full h-10 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                placeholder="azreanatalie@example.com"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4 border-t border-gray-200 gap-3">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            Simpan Anggota
                        </button>
                        <button
                            type="submit"
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            Hapus Anggota
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};