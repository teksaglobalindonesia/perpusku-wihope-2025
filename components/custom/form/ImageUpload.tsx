import Image from "next/image";
import React from "react";

export const ImageUpload: React.FC = () => (
  <div>
    <label className="block text-sm font-medium mb-1 mt-5">Cover</label>
    <button
      type="button"
      className="bg-action-warning text-neutral-white text-sm px-2 py-1 rounded mb-2"
    >
      Pilih Gambar
    </button>
    <div>
      <Image
        src="/aset/NoImage.jpg"
        alt="Preview Cover"
        width={130}
        height={130}
        className="mb-10 mt-3"
      />
    </div>
  </div>
);
