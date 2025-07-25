"use client";

import { Navbar } from "@/components/custom/navbar";
import { Footer } from "@/components/custom/footer";
import { InputText } from "@/components/custom/form/InputText";
import { CheckboxList } from "@/components/custom/form/CheckboxList";
import { ImageUpload } from "@/components/custom/form/ImageUpload";
import { SubmitButton } from "@/components/custom/form/SubmitButton";

const inputFields = [
  { label: "Judul", placeholder: "Masukkan judul buku...", name: "judul" },
  { label: "Penulis", placeholder: "Masukkan penulis...", name: "penulis" },
  { label: "Penerbit", placeholder: "Masukkan penerbit...", name: "penerbit" },
  { label: "Tahun Terbit", placeholder: "Masukkan tahun terbit...", name: "tahun" },
];

export default function TambahPage() {
  return (
    <>
      <Navbar />
      <div className="bg-neutral-white min-h-screen p-10 flex">
        <div className="w-[500px] p-6">
          <h1 className="text-neutral-dbrown font-bold font-inter text-[30px] mb-4">
            Tambah Buku
          </h1>

          <form className="relative">
            {inputFields.map((field) => (
              <InputText
                key={field.name}
                label={field.label}
                placeholder={field.placeholder}
                name={field.name}
              />
            ))}

            <InputText
              label="Stok"
              placeholder="masukkan stok..."
              name="stok"
              type="number"
            />

            <CheckboxList />
            <ImageUpload />
            <SubmitButton />
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
