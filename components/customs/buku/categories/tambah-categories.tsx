"use client";

import Link from "next/link";
import { useState } from "react";
import { addCategories } from "@/lib/api";

export default function TambahCate(){
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false); 
    const [popupMessage, setPopupMessage] = useState("");

    async function handleSave() {
        try {
            setLoading(true);
            const payload = { 
                name, 
            };
            console.log("Data dikirim:", payload);

            const res = await addCategories(payload);
            console.log("Respon API:", res);

            setPopupMessage("Categories successfully added!");
            setShowPopup(true);

        } catch (err) {
            console.error("Error:", err);
            setPopupMessage("Categories failed to add!");
            setShowPopup(true);
        } finally {
            setLoading(false);
        }
    }

    function handlePopupClose() {
        setShowPopup(false);
        setName("");
    }

    return (
        <>
        <div className="w-full px-4 md:px-[64px] mt-16 md:mt-[84px] bg-[#FFEAC5] pb-6">
            <div className="w-full flex justify-center items-center py-6 md:py-8">
                <h1 className="font-morrisroman text-2xl md:text-3xl font-semibold text-center">
                    Add a New Categories
                </h1>
            </div>
            <div className="w-full px-4 md:px-[64px] py-5 bg-[#6C4E31] rounded-lg text-white font-cyrodiil text-base md:text-lg">
                <div className="w-full px-2 md:px-4">
                    <div className="py-2">
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mt-2 md:mt-4 py-2 px-3 border-2 rounded-md text-black"
                            placeholder="Enter your Name"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 py-4">
                        <Link
                            href="/buku/tambah_buku"
                            className="bg-[#F0F2BD] hover:bg-[#F2C078] duration-300 text-black py-2 px-4 clip-custom text-center"
                        >
                            ← Back
                        </Link>
                        <button
                            type="button"
                            disabled={loading}
                            className="bg-[#F0F2BD] hover:bg-[#F2C078] duration-300 text-black py-2 px-4 clip-custom"
                            onClick={handleSave}
                        >
                            {loading ? "Saving..." : "Save Categories"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {showPopup && (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-[#F2C078] w-[90%] md:w-[500px] h-auto md:h-[142px] p-4 md:p-0 rounded-xl shadow-lg z-[9999]">
                <div className="w-full md:w-64 font-cyrodiil flex flex-col items-center justify-center text-center">
                    <h1 className="text-lg md:text-xl mb-4">
                        {popupMessage}
                    </h1>
                    <button
                        className="bg-green-400 hover:bg-green-600 duration-300 text-white px-4 md:px-8 py-2 clip-custom"
                        onClick={handlePopupClose}
                    >
                        OK
                    </button>
                </div>
            </div>
        )}
        </>
    );
}
