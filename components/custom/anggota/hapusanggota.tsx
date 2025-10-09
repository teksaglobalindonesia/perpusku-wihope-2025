"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";

interface HapusAnggotaDialogProps {
  documentId: string;
  onConfirm: () => void;
}

export default function HapusAnggotaDialog({
  documentId,
  onConfirm,
}: HapusAnggotaDialogProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      console.log("🔹 Kirim request hapus anggota dengan documentId:", documentId);

      const res = await fetch(`${BASE_URL}/api/member/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
          "x-wihope-name": WIHOPE_NAME,
        },
        body: JSON.stringify({ documentId }),
      });

      const text = await res.text();
      console.log("📩 Response API:", text);

      if (!res.ok) {
        throw new Error(
          `Gagal hapus anggota. Status: ${res.status}. Response: ${text}`
        );
      }

      onConfirm();
      alert("✔️ Anggota berhasil dihapus!");
    } catch (err) {
      console.error("❌Error delete anggota:", err);
      alert("Terjadi kesalahan saat menghapus anggota. Cek console untuk detail‼️");
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#FFEAA7] text-black font-semibold hover:bg-[#ffd96a]">
          HAPUS
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-[#D9D9D9] rounded-md p-6 max-w-sm w-full text-center shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Apakah yakin menghapus anggota ini?
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={handleDelete}
            className="bg-[#EB4D4B] text-white px-4 py-2 rounded hover:bg-[#ff6b6b]"
          >
            HAPUS
          </Button>
          <Button
            onClick={() => setOpen(false)}
            className="bg-white border border-gray-400 text-black px-4 py-2 rounded"
            variant="outline"
          >
            BATAL
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
