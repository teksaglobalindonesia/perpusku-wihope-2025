"use client";

import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";
import { useEffect, useState } from "react";

export const Tambah_buku = () => {
    const [judul, setJudul] = useState("");
    const [penulis, setPenulis] = useState("");
    const [penerbit, setPenerbit] = useState("");
    const [tahun, setTahun] = useState("");
    const [stok, setStok] = useState("");
    const [kategori, setKategori] = useState<string[]>([]);
    const [cover, setCover] = useState<File | null>(null);
    const [pesan, setPesan] = useState("");
    const [loading, setLoading] = useState(false);
    const [dataKategori, setDataKategori] = useState<any[]>([]);
    const [kategoriBaru, setKategoriBaru] = useState("");
    const [showInputKategori, setShowInputKategori] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/book-category/list`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: TOKEN,
                        'x-wihope-name': WIHOPE_NAME,
                    },
                    cache: 'no-store',
                });

                const categories = await res.json();
                setDataKategori(categories?.data || []);
            } catch (error) {
                console.error("Gagal mengambil data:", error);
            }
        };
        fetchData();
    }, []);

    const handleKategoriChange = (genre: string) => {
        setKategori((prev) =>
            prev.includes(genre)
                ? prev.filter((k) => k !== genre)
                : [...prev, genre]
        );
    };

    const handleTambahKategoriBaru = async () => {
    if (!kategoriBaru.trim()) return;
    try {
        const res = await fetch(`${BASE_URL}/api/book-category/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: TOKEN,
                "x-wihope-name": WIHOPE_NAME,
            },
            body: JSON.stringify({
                data: {
                    name: kategoriBaru
                }
            }),
        });

        const result = await res.json();
        if (res.ok) {
            setDataKategori([...dataKategori, result.data]);
            setKategori([...kategori, result.data.documentId]);
            setKategoriBaru("");
            setShowInputKategori(false);
        } else {
            alert(result.message || "Gagal menambah kategori");
        }
    } catch (error) {
        console.error("Gagal menambah kategori:", error);
    }
};

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setPesan("");

        try {
            const formData = new FormData();
            if (cover) {
                formData.append("cover", cover);
            }
            formData.append(
                "data",
                JSON.stringify({
                    title: judul,
                    writer: penulis,
                    publisher: penerbit,
                    published_year: tahun,
                    stock: Number(stok),
                    categories: kategori,
                })
            );

            const res = await fetch(`${BASE_URL}/api/book/add`, {
                method: "POST",
                headers: {
                    Authorization: TOKEN,
                    "x-wihope-name": WIHOPE_NAME,
                },
                body: formData,
            });

            const result = await res.json();

            if (res.ok) {
                setPesan("Buku berhasil ditambahkan!");
                setJudul("");
                setPenulis("");
                setPenerbit("");
                setTahun("");
                setStok("");
                setKategori([]);
                setCover(null);
            } else {
                setPesan(`Gagal: ${result.message || "Terjadi kesalahan"}`);
            }
        } catch (error) {
            console.error(error);
            setPesan("Error saat mengirim data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold mb-8 pb-4">✏️ Tambah Data Buku</h1>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium mb-1">Judul Buku</label>
                    <input value={judul} onChange={(e) => setJudul(e.target.value)} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#5bbd87] focus:outline-none" 
                    placeholder="Masukkan Judul Buku"
                    required />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Penulis</label>
                    <input value={penulis} onChange={(e) => setPenulis(e.target.value)} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#5bbd87] focus:outline-none" 
                    placeholder="Masukkan Penulis"
                    required />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Penerbit</label>
                    <input value={penerbit} onChange={(e) => setPenerbit(e.target.value)} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#5bbd87] focus:outline-none" 
                    placeholder="Masukkan Penerbit"
                    required />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Tahun Terbit</label>
                    <input type="number" value={tahun} onChange={(e) => setTahun(e.target.value)} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#5bbd87] focus:outline-none"
                    placeholder="Masukkan Tahun Terbit"
                    required />
                </div>

                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium">Kategori</label>
                        <button
                            type="button"
                            onClick={() => setShowInputKategori(true)}
                            className="text-sm text-gray-700 hover:underline"
                        >
                            + Tambah Kategori
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {dataKategori.map((genre) => (
                            <label key={genre.documentId} className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={kategori.includes(genre.documentId)}
                                    onChange={() => handleKategoriChange(genre.documentId)}
                                />
                                <span>{genre.name}</span>
                            </label>
                        ))}
                    </div>

                    {showInputKategori && (
                        <div className="flex gap-2 mt-3 ">
                            <input
                                value={kategoriBaru}
                                onChange={(e) => setKategoriBaru(e.target.value)}
                                placeholder="Nama kategori baru"
                                className="p-2 flex-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#5bbd87] focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={handleTambahKategoriBaru}
                                className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-600 transition disabled:opacity-50"
                            >
                                Simpan
                            </button>
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Jumlah Stok</label>
                    <input type="number" value={stok} onChange={(e) => setStok(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#5bbd87] focus:outline-none" 
                    placeholder="Masukkan Jumlah Stok"
                    required />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Cover Buku</label>
                    <input type="file" accept="image/*" onChange={(e) => setCover(e.target.files?.[0] || null)} />
                    {cover && <img src={URL.createObjectURL(cover)} alt="Preview" className="w-40 mt-3 rounded shadow" />}
                </div>

                {pesan && <p className="text-sm mt-2">{pesan}</p>}

                <div className="pt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#5bbd87] text-white px-5 py-2 rounded-lg shadow hover:bg-[#4a996d] transition disabled:opacity-50"
                    >
                        {loading ? "Menyimpan..." : "Simpan"}
                    </button>
                </div>
            </form>
        </div>
    );
};
