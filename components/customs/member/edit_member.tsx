"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchMemberById, editMember } from "@/lib/api";

interface MemberData {
    documentId: string;
    id_member: string;
    name: string;
    email: string;
    address: string;
    createdAt?: string;
}

export default function EditMemb({ documentId }: { documentId: string }) {
    const [idMember, setIdMember] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [memberData, setMemberData] = useState<MemberData | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (documentId) {
            loadMemberData();
        }
    }, [documentId]);

    const loadMemberData = async () => {
        try {
            setLoadingData(true);
            console.log("Loading member data for documentId:", documentId);
            const data = await fetchMemberById(documentId);
            console.log("Member data loaded:", data);
            
            if (data) {
                setMemberData(data);
                setIdMember(data.id_member || "");
                setName(data.name || "");
                setEmail(data.email || "");
                setAddress(data.address || "");
            } else {
                throw new Error("Member data is empty");
            }
        } catch (error) {
            console.error("Failed to load member data:", error);
            setPopupMessage("Failed to load member data: " + (error as Error).message);
            setShowPopup(true);
        } finally {
            setLoadingData(false);
        }
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        setPopupMessage("");

        if (loadingData && !memberData) {
            router.push("/anggota");
        }
    };

    const handleSave = async () => {
        if (!documentId) {
            setPopupMessage("Document ID is required");
            setShowPopup(true);
            return;
        }

        if (!idMember || !name || !email || !address) {
            setPopupMessage("Please fill all required fields");
            setShowPopup(true);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setPopupMessage("Please enter a valid email address");
            setShowPopup(true);
            return;
        }

        setLoading(true);
        try {
            const memberDataToSend = {
                documentId: documentId,
                id_member: idMember,
                name: name,
                email: email,
                address: address
            };

            console.log("Sending member data:", memberDataToSend);
            const response = await editMember(memberDataToSend);
            console.log("Member updated successfully:", response);
            
            setPopupMessage("Member updated successfully!");
            setShowPopup(true);
            
            setTimeout(() => {
                router.push("/anggota");
            }, 2000);
            
        } catch (error) {
            console.error("Failed to update member:", error);
            setPopupMessage("Failed to update member: " + (error as Error).message);
            setShowPopup(true);
        } finally {
            setLoading(false);
        }
    };

    if (loadingData) {
        return (
            <div className="w-full px-4 md:px-[64px] mt-6 md:mt-[84px] bg-[#FFEAC5] pb-6 flex justify-center items-center h-96">
                <p className="text-xl text-[#6C4E31]">Loading member data...</p>
            </div>
        );
    }

    return (
        <>
            <div className="w-full px-4 md:px-[64px] mt-6 md:mt-[84px] bg-[#FFEAC5] pb-6">
                <div className="w-full flex justify-center items-center py-4 md:py-8">
                    <h1 className="font-morrisroman text-2xl md:text-3xl font-semibold">
                        Edit a Member
                    </h1>
                </div>
                <div className="w-full px-4 md:px-[64px] py-5 bg-[#6C4E31] rounded-lg text-white font-cyrodiil text-base md:text-lg">
                    <div className="w-full px-2 md:px-4">
                        <div className="py-2">
                            <label className="block mb-1">ID Member</label>
                            <input
                                type="text"
                                value={idMember}
                                onChange={(e) => setIdMember(e.target.value)}
                                className="w-full mt-2 md:mt-4 py-2 px-3 border-2 rounded-md text-black"
                                placeholder="Enter your NIM"
                            />
                        </div>
                        <div className="py-2">
                            <label className="block mb-1">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full mt-2 md:mt-4 py-2 px-3 border-2 rounded-md text-black"
                                placeholder="Enter your Name"
                            />
                        </div>
                        <div className="py-2">
                            <label className="block mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mt-2 md:mt-4 py-2 px-3 border-2 rounded-md text-black"
                                placeholder="Enter your Email"
                            />
                        </div>
                        <div className="py-2">
                            <label className="block mb-1">Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full mt-2 md:mt-4 py-2 px-3 border-2 rounded-md text-black"
                                placeholder="Enter your Address"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 py-4">
                            <Link
                                href="/anggota"
                                className="bg-[#F0F2BD] hover:bg-[#F2C078] duration-300 text-black py-2 px-4 clip-custom text-center"
                            >
                                ← Back
                            </Link>
                            <button
                                type="button"
                                disabled={loading}
                                className="bg-[#F0F2BD] hover:bg-[#F2C078] duration-300 text-black py-2 px-4 clip-custom disabled:opacity-50"
                                onClick={handleSave}
                            >
                                {loading ? "Saving..." : "Save Member"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-[#F2C078] w-[90%] md:w-[500px] h-auto md:h-[142px] p-4 md:p-0 rounded-xl shadow-lg">
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
                </div>
            )}
        </>
    );
}