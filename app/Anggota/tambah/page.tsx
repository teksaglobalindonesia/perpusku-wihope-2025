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
      <div className="bg-neutral-white h-[670px] flex flex-col justify-center items-center">
        <h1 className="text-neutral-dbrown font-bold font-inter text-[30px] mb-10">
            Tambah Anggota
        </h1>
        <div className="bg-white border border-neutral-300 rounded-xl shadow-lg w-full max-w-lg p-8">
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
