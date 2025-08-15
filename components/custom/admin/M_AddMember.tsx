'use client';
import { useState } from 'react';
import { BASE_URL, NAME, TOKEN } from '@/lib/api';

export const M_AddMember = () => {
    const [name, setName] = useState('');
    const [uid, setUID] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch(
                `${BASE_URL}/api/member/add`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: TOKEN,
                        'x-wihope-name': NAME,
                    },
                    body: JSON.stringify({
                        data: {
                            name,
                            email,
                            address,
                            id_member: uid,
                        }
                    }),
                    cache: 'no-store',
                }
            );

            if (!response.ok) {
                throw new Error('Failed to add member');
            }

            setSuccess(true);
            // Reset form
            setName('');
            setUID('');
            setEmail('');
            setAddress('');
            
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-h-[80%] bg-gray-50 px-5 md:px-10 pb-16">
            <div className="mx-auto">
                {/* Header Section */}
                <div className="mb-12 w-full">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight tracking-tight mb-4">
                        TAMBAH ANGGOTA
                    </h1>
                </div>

                {/* Form Section */}
                <div className="bg-white border-2 border-black p-8">
                    {error && (
                        <div className="mb-4 p-4 bg-red-100 text-red-700">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 p-4 bg-green-100 text-green-700">
                            Member added successfully!
                        </div>
                    )}
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Nama */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    Nama
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Azrea Natalie"
                                    className="w-full h-12 px-6 bg-white border-2 border-black text-base font-medium focus:outline-none placeholder-gray-400"
                                    required
                                />
                            </div>

                            {/* UID */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="uid" className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    UID
                                </label>
                                <input
                                    type="text"
                                    name="uid"
                                    id="uid"
                                    value={uid}
                                    onChange={(e) => setUID(e.target.value)}
                                    placeholder="M_001"
                                    className="w-full h-12 px-6 bg-white border-2 border-black text-base font-medium focus:outline-none placeholder-gray-400"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="azreanatalie@example.com"
                                    className="w-full h-12 px-6 bg-white border-2 border-black text-base font-medium focus:outline-none placeholder-gray-400"
                                    required
                                />
                            </div>

                            {/* Address */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="address" className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    Alamat
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter address"
                                    className="w-full h-12 px-6 bg-white border-2 border-black text-base font-medium focus:outline-none placeholder-gray-400"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-6 border-t border-black">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`bg-black text-white px-8 py-3 text-sm font-bold tracking-wider hover:bg-gray-800 transition-colors duration-300 ${
                                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                {isSubmitting ? 'SAVING...' : 'SIMPAN ANGGOTA'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};