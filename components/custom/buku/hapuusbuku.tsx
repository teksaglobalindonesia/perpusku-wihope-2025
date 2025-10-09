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

interface HapusBukuDialogProps {
  documentId: string;
  onConfirm: () => void;
}

export default function HapusBukuDialog({
  documentId,
  onConfirm,
}: HapusBukuDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      console.log("📤 Body yang dikirim:", { documentId });

      const res = await fetch(`${BASE_URL}/api/book/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
          "x-wihope-name": WIHOPE_NAME,
        },
        body: JSON.stringify({ documentId }),
        cache: "no-store",
      });

      const json = await res.json();
      console.log("📩 Response API hapus buku:", json);

      if (!res.ok) {
        throw new Error(json?.message || `Gagal hapus buku: ${res.status}`);
      }

      onConfirm(); 
      alert("✅ Buku berhasil dihapus!");
    } catch (err) {
      console.error("❌ Error hapus buku:", err);
      alert("❌ Terjadi kesalahan saat menghapus buku.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-500 text-white hover:bg-red-600">HAPUS</Button>
      </DialogTrigger>
      <DialogContent className="bg-[#D9D9D9] rounded-md p-6 max-w-sm w-full text-center shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Apakah yakin menghapus buku ini?
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            {loading ? "Menghapus..." : "HAPUS"}
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
