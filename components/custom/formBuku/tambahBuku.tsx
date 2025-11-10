import { Checkbox } from '@radix-ui/react-checkbox';    

export const TambahBuku = () => {
  return (
    <div className="h-[550px] w-full gap-4 p-6">
      <h1 className="text-[25px] not-italic">Edit Buku</h1>
      <div className="w-full rounded bg-gray-400 p-6 shadow-lg">
        <div>
          <h1>Judul</h1>
          <input
            type="text"
            placeholder="Masukan Judul"
            className="rounded-md border border-gray-400 px-4 py-2 focus:outline-none"
          />
          <h1>Penulis</h1>
          <input
            type="text"
            placeholder="Masukan Penulis"
            className="rounded-md border border-gray-400 px-4 py-2 focus:outline-none"
          />
          <h1>Penerbit</h1>
          <input
            type="text"
            placeholder="Masukan Penerbit"
            className="rounded-md border border-gray-400 px-4 py-2 focus:outline-none"
          />
          <h1>Tahun Terbit</h1>
          <input
            type="text"
            placeholder="Masukan Tahun Terbit"
            className="rounded-md border border-gray-400 px-4 py-2 focus:outline-none"
          />
          <h1>Kategori</h1>
          <button className="rounded-md bg-orange-500 px-4 py-2">
            Tambah Kategori
          </button>
          <div>
            <h1>
              <input type="checkbox" placeholder="Romance" />
              Romance
            </h1>
            <h1>
              <input type="checkbox" placeholder="Adventure" />
              Adventure
            </h1>
            <h1>
              <input type="checkbox" placeholder="Horror" />
              Horror
            </h1>
          </div>

            <label className="w-fit cursor-pointer rounded bg-yellow-400 px-4 py-2 font-semibol">
              Pilih Gambar
              <input type="file" accept="image/*" className="hidden" />
            </label>
            <button className="rounded-md bg-green-500 px-4 py-2">Simpan Buku</button>
        </div>
      </div>
    </div>
  );
};
