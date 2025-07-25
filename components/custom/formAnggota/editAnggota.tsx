




export const EditAnggota = () => {
  return (
    <>
      <div className="h-[550px] w-full gap-4 p-6">
        <h1 className="text-[25px] not-italic">Tambah Anggota</h1>
        <div className="w-full rounded bg-gray-400 p-6 shadow-lg">
          <div className="flex flex-col gap-4">
            <div>
              <h1>Nama Anggota</h1>
              <input
                type="text"
                placeholder="Masukan Nama Anggota"
                className="w-full rounded-md border border-gray-400 px-4 py-2 focus:outline-none"
              />
            </div>
            <div>
              <h1>Nomor Anggota</h1>
              <input
                type="text"
                placeholder="Masukan Nomor Anggota"
                className="w-full rounded-md border border-gray-400 px-4 py-2 focus:outline-none"
              />
            </div>
            <div>
              <h1>Email</h1>
              <input
                type="email"
                placeholder="Masukan Email"
                className="w-full rounded-md border border-gray-400 px-4 py-2 focus:outline-none"
              />
            </div>
            <div>
              <h1>Alamat</h1>
              <input
                type="text"
                placeholder="Masukan Alamat"
                className="w-full rounded-md border border-gray-400 px-4 py-2 focus:outline-none"
              />
            </div>
            <div className="flex gap-4">
            <button className="mt-4 w-fit rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 transition">
              Simpan Anggota
            </button>
            <button className="mt-4 w-fit rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition">
              Hapus Anggota
            </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
