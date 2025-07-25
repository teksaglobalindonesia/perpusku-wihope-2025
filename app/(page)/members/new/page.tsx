export default function AddNewMember() {
  return (
    <div className="mx-auto  flex flex-col items-center justify-center rounded-md border p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Tambah Anggota</h2>

      <div className="w-[75%] rounded-[20px] bg-neutral-silver p-[30px]">
        <div>
          <label className="mb-1 block font-medium">Nomer</label>
          <input
            type="text"
            className="w-full rounded border px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Nama</label>
          <input
            type="text"
            className="w-full rounded border px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="mb-1 block font-medium">Email</label>
          <input
            type="text"
            className="w-full rounded border px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="mb-1 block font-medium">Alamat</label>
          <input
            type="text"
            className="w-full rounded border px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded bg-green-500 py-2 text-white transition hover:bg-green-600"
        >
          SIMPAN ANGGOTA
        </button>
      </div>
    </div>
  );
}
