import React from "react";

interface ButtonPilihProps {
  label: string;
  onClick: () => void;
}

export const ButtonPilih = ({ label, onClick }: ButtonPilihProps) => {
    return (
        <div>
            <label className="block text-md mb-2">{label}</label>
            <button
                onClick={onClick}
                className="border border-neutral-dbrown px-20 py-1 rounded text-sm mb-4"
            >
                Pilih
            </button>
        </div>
    );
}