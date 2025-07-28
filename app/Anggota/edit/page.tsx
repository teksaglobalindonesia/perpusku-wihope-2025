"use client";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/custom/navbar";
import { Footer } from "@/components/custom/footer";
import { InputText } from "@/components/custom/form/InputText";
import { SubmitButton } from "@/components/custom/form/SubmitButton";

const inputFields = [
  { label: "Nama", placeholder: "Masukkan nama anggota...", name: "name" },
  { label: "Nomor Anggota", placeholder: "Masukkan nomor anggota...", name: "noAnggota" },
  { label: "Email", placeholder: "Masukkan email...", name: "email" },
  { label: "Alamat", placeholder: "Masukkan alamat...", name: "alamat" },
];

export default function EditPage() {
  const [formData, setFormData] = useState({
    name: "",
    noAnggota: "",
    email: "",
    alamat: "",
  });


  useEffect(() => {
    const saved = localStorage.getItem("editAnggota");
    if (saved) {
      setFormData({ ...JSON.parse(saved), alamat: "" }); 
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data yang dikirim:", formData);
    alert("Data berhasil disimpan (simulasi)");
  };

  return (
    <>
      <Navbar />
      <div className="bg-neutral-white h-[670px] flex flex-col justify-center items-center">
        <h1 className="text-neutral-dbrown font-bold font-inter text-[30px] mb-10">
            Edit Anggota
          </h1>
        <div className="bg-neutral-white border border-neutral-300 rounded-xl shadow-lg w-full max-w-lg p-8">
          <form className="relative" onSubmit={handleSubmit}>
            {inputFields.map((field) => (
              <InputText
                key={field.name}
                label={field.label}
                placeholder={field.placeholder}
                name={field.name}
                value={formData[field.name as keyof typeof formData] || ""}
                onChange={handleChange}
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
