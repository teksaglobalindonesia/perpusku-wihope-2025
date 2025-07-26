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

interface HapusAnggotaDialogProps {
  onConfirm: () => void;
}

export default function HapusAnggotaDialog({ onConfirm }: HapusAnggotaDialogProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    onConfirm(); // menjalankan fungsi penghapusan dari parent
    setOpen(false); // tutup modal
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
