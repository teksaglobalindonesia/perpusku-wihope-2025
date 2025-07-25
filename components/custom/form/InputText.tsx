import React from "react";

interface InputTextProps {
  label: string;
  placeholder?: string;
  name: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputText = ({ label, placeholder, name, type = "text", value, onChange }: InputTextProps) => {
    return (    
      <div>
        <label className="block text-md mb-2">{label}</label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="border px-5 py-1 rounded text-sm mb-4"
        />
      </div>
    );
}