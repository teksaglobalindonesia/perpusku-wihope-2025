import React from "react";

const kategoriList = ["Romance", "Adventure", "Horror", "Mystery", "Fantasy", "Science Fiction", "Historical", "Drama", "Inspirational"];

export const CheckboxList: React.FC = () => (
  <div>
    <label className="block text-md mb-2">Kategori</label>
    <button type="button" className="bg-neutral-beige text-neutral-dbrown font-medium text-md px-8 py-1">
      Tambah Kategori
    </button>
    <div className="space-y-1 grid-cols-2 grid gap-1 mt-2">
      {kategoriList.map((kategori) => (
        <label key={kategori} className="flex items-center gap-2 mt-4">
          <input type="checkbox" className="cursor-pointer" value={kategori} />
          {kategori}
        </label>
      ))}
    </div>
  </div>
);
