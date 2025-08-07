export const MCreate = () => {
  return (
    <div className="mx-auto max-w-3xl  rounded-xl bg-vintage-parchment border-vintage-sage border p-8 font-vintage shado shadow-lg backdrop-blur-xl">
      {/* Header with decorative elements */}
      <div className="mb-8 relative">
        <div className="absolute -left-2 top-0 h-full w-1 bg-vintage-terracotta rounded-full"></div>
        <h1 className="text-3xl font-medium text-vintage-brown pl-4">
          <span className="mr-3 text-vintage-terracotta text-4xl">✎</span> 
          Tambah Anggota
        </h1>
        <p className="text-beige-700 pl-12 mt-1 text-sm italic">Lengkapi data anggota baru</p>
      </div>

      <form className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-beige-800 tracking-wide">
              Nomor <span className="text-vintage-terracotta">*</span>
            </label>
            <input
              type="number"
              className="w-full rounded-lg border-2 border-beige-200 bg-white/80 px-4 py-2.5 text-beige-900 
                         focus:border-vintage-sage focus:outline-none focus:ring-2 focus:ring-vintage-sage/30
                         transition-all duration-200 placeholder-beige-300"
              required
              placeholder="0123"
            />
          </div>

          {['Nama', 'Email', 'Alamat'].map((field) => (
            <div key={field} className="space-y-2">
              <label className="text-sm font-medium text-beige-800 tracking-wide">
                {field} <span className="text-vintage-terracotta">*</span>
              </label>
              <input
                type={field === 'Email' ? 'email' : 'text'}
                className="w-full rounded-lg border-2 border-beige-200 bg-white/80 px-4 py-2.5 text-beige-900 
                           placeholder-beige-300 focus:border-vintage-sage focus:outline-none 
                           focus:ring-2 focus:ring-vintage-sage/30 transition-all duration-200"
                placeholder={`Masukkan ${field.toLowerCase()}`}
                required
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="rounded-xl bg-vintage-terracotta px-6 py-3 text-sm font-medium text-white 
                       shadow-md hover:bg-vintage-terracotta/90 focus:outline-none focus:ring-2 
                       focus:ring-vintage-terracotta/50 focus:ring-offset-2 transition-all duration-200
                       hover:shadow-lg hover:-translate-y-0.5"
          >
            Simpan Anggota
          </button>
        </div>
      </form>
    </div>
  );
};