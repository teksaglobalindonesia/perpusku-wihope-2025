import React from "react";

export const SubmitButton: React.FC = () => (
  <div>
    <button
      type="submit"
      className="bg-action-success text-neutral-dbrown px-4 py-2 rounded font-semibold hover:bg-neutral-beige-hover transition-colors mt-4 mr-5"
    >
      SIMPAN
    </button>

    <button
      type="button"  
      onClick={() => window.history.back()}
      className="bg-action-error text-neutral-white px-4 py-2 rounded font-semibold hover:bg-red-500 transition-colors mt-4"
    >
      BATAL 
    </button>
  </div>
);
