export const BFormEdit = () => {
  return (
    <div className="mx-auto max-w-3xl rounded-xl bg-beige-50 p-8 font-vintage shadow-lg shadow-beige-200/50">
      <div className="mb-8 flex items-center justify-between border-b border-beige-200 pb-6">
        <h1 className="text-2xl font-bold text-vintage-brown">
          <span className="mr-2 text-3xl"></span> Edit Informasi Buku
        </h1>
        <div className="h-2 w-16 rounded-full bg-vintage-sage/30"></div>
      </div>

      <form className="space-y-8">
        {/* Main Book Info */}
        <div className="grid gap-6 md:grid-cols-2">
          {['Judul', 'Penulis', 'Penerbit'].map((field) => (
            <div key={field} className="group relative">
              <label
                htmlFor={field.toLowerCase()}
                className="mb-1 block text-sm font-medium text-beige-700"
              >
                {field}
              </label>
              <input
                type="text"
                id={field.toLowerCase()}
                className="w-full rounded-lg border border-beige-300 bg-white px-4 py-3 text-beige-900 placeholder-beige-400 transition-all focus:border-vintage-sage focus:ring-2 focus:ring-vintage-sage/30"
                placeholder={`Masukkan ${field.toLowerCase()}`}
              />
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-vintage-sage transition-all duration-300 group-focus-within:w-full"></div>
            </div>
          ))}

          <div className="group relative">
            <label
              htmlFor="tahun-terbit"
              className="mb-1 block text-sm font-medium text-beige-700"
            >
              Tahun Terbit
            </label>
            <input
              type="number"
              id="tahun-terbit"
              className="w-full rounded-lg border border-beige-300 bg-white px-4 py-3 text-beige-900 transition-all focus:border-vintage-sage focus:ring-2 focus:ring-vintage-sage/30"
            />
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-vintage-sage transition-all duration-300 group-focus-within:w-full"></div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="rounded-xl border border-beige-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-beige-800">Kategori</h3>
            <button
              type="button"
              className="flex items-center gap-1 rounded-full bg-beige-100 px-4 py-2 text-sm font-medium text-beige-700 transition-colors hover:bg-beige-200"
            >
              <span>+</span> Tambah Kategori
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {[
              'Fiksi',
              'Non-Fiksi',
              'Sains',
              'Sejarah',
              'Fantasi',
              'Romance',
              'Misteri',
              'Biografi',
              'Seni',
              'Teknologi'
            ].map((category, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`kategori-${index}`}
                  className="peer hidden"
                />
                <label
                  htmlFor={`kategori-${index}`}
                  className="cursor-pointer select-none rounded-full border border-beige-300 px-4 py-2 text-sm text-beige-700 transition-all peer-checked:border-vintage-sage peer-checked:bg-vintage-sage/10 peer-checked:text-vintage-sage"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Stock & Image */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="group relative">
            <label
              htmlFor="stok"
              className="mb-1 block text-sm font-medium text-beige-700"
            >
              Jumlah Stok
            </label>
            <div className="relative">
              <input
                type="number"
                id="stok"
                className="w-full rounded-lg border border-beige-300 bg-white px-4 py-3 text-beige-900 transition-all focus:border-vintage-sage focus:ring-2 focus:ring-vintage-sage/30"
              />
              <div className="absolute right-8 top-1/2 -translate-y-1/2 text-sm text-beige-500">
                buku
              </div>
            </div>
            <div className="duration-30 absolute bottom-0 left-0 h-0.5 w-0 bg-vintage-sage transition-all group-focus-within:w-full"></div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-beige-700">
              Cover Buku
            </label>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dashed border-beige-300 bg-beige-100 text-beige-400">
                <span className="text-2xl">+</span>
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="inline-block cursor-pointer rounded-lg bg-beige-100 px-4 py-2 text-sm font-medium text-beige-700 transition-colors hover:bg-beige-200"
                >
                  Pilih Gambar
                </label>
                <input type="file" id="image" className="hidden" />
                <p className="mt-1 text-xs text-beige-500">
                  Format: JPG, PNG (max 2MB)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            className="rounded-lg border border-beige-300 bg-white px-6 py-2.5 text-sm font-medium text-beige-700 transition-colors hover:bg-beige-100"
          >
            Hapus
          </button>
          <button
            type="submit"
            className="rounded-lg bg-vintage-sage px-6 py-2.5 text-sm font-medium text-white shadow-md transition-colors hover:bg-vintage-sage/90"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
};
