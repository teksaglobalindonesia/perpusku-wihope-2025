"use client";

import { Navbar } from "@/components/custom/navbar";
import { Footer } from "@/components/custom/footer";
import { InputText } from "@/components/custom/form/InputText";
import { SubmitButton } from "@/components/custom/form/SubmitButton";

const inputFields = [
  { label: "Nama", placeholder: "Masukkan nama anggota...", name: "nama" },
  { label: "Nomor Anggota", placeholder: "Masukkan nomor anggota...", name: "noAnggota" },
  { label: "Email", placeholder: "Masukkan email...", name: "email" },
  { label: "Alamat", placeholder: "Masukkan alamat...", name: "alamat" },
];

export default function TambahPage() {
  return (
    <>
      <Navbar />
      <div className="bg-neutral-white min-h-screen p-10 flex">
        <div className="w-[500px] p-6">
          <h1 className="text-neutral-dbrown font-bold font-inter text-[30px] mb-4">
            Tambah Anggota
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

            <SubmitButton />
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
