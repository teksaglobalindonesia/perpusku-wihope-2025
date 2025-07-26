import { D_LoanBooks } from "@/components/custom/admin/D_LoanBook";
import { D_ReturnBooks } from "@/components/custom/admin/D_ReturnBook";
import { D_EmptyBook } from "@/components/custom/admin/D_EmptyBook";
// import { D_Header } from "@/components/custom/admin/header";

export const StatusBuku = [
    {
        title: "Mengenal React",
        borrower: "Alicia",
        borrowedAt: "2025-07-10",
        returnedAt: "2025-07-15",
        status: 1
    },
    {
        title: "Komedi Receh Indonesia",
        borrower: "Samuel",
        borrowedAt: "2025-07-11",
        returnedAt: "2025-07-18",
        status: 0
    },
    {
        title: "Tips Nulis Buku Digital",
        borrower: "Jonathan",
        borrowedAt: "2025-07-12",
        returnedAt: "2025-07-19",
        status: 1
    },
    {
        title: "Petualangan Si Belang",
        borrower: "Fajar",
        borrowedAt: "2025-07-13",
        returnedAt: "2025-07-20",
        status: 0
    },
    {
        title: "Belajar Bahasa Jepang",
        borrower: "Alicia",
        borrowedAt: "2025-07-14",
        returnedAt: "2025-07-21",
        status: 1
    },
    {
        title: "Dasar-dasar Machine Learning",
        borrower: "Aquman",
        borrowedAt: "2025-07-15",
        returnedAt: "2025-07-22",
        status: 0
    },
    {
        title: "Fotografi Malam Hari",
        borrower: "Samuel",
        borrowedAt: "2025-07-15",
        returnedAt: "2025-07-22",
        status: 0
    },
    {
        title: "Mastering TailwindCSS",
        borrower: "Alicia",
        borrowedAt: "2025-07-16",
        returnedAt: "2025-07-23",
        status: 1
    },
    {
        title: "Hacking untuk Pemula",
        borrower: "Jonathan",
        borrowedAt: "2025-07-17",
        returnedAt: "2025-07-24",
        status: 0
    },
    {
        title: "Ilmu Parenting Zaman Now",
        borrower: "Fajar",
        borrowedAt: "2025-07-18",
        returnedAt: "2025-07-25",
        status: 0
    },
    {
        title: "Hacking untuk Pemula",
        borrower: "Jonathan",
        borrowedAt: "2025-07-17",
        returnedAt: "2025-07-24",
        status: 2
    },
    {
        title: "Ilmu Parenting Zaman Now",
        borrower: "Fajar",
        borrowedAt: "2025-07-18",
        returnedAt: "2025-07-25",
        status: 2
    }
];

export const BookList = [
    {
        id: 1,
        title: "Belajar JavaScript dari Nol",
        genre: "Programming",
        author: "Alicia",
        stock: 3,
        image: "https://images.unsplash.com/photo-1743345258591-4f837fe8345b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
    },
    {
        id: 2,
        title: "Mengenal React",
        genre: "Programming",
        author: "Samuel",
        stock: 0,
        image: "https://images.unsplash.com/photo-1743345258591-4f837fe8345b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
    },
    {
        id: 3,
        title: "Cara Menjadi Influencer",
        genre: "Lifestyle",
        author: "Aquman",
        stock: 1,
        image: "https://images.unsplash.com/photo-1743345258591-4f837fe8345b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
    },
    {
        id: 4,
        title: "Tips UI/UX 2025",
        genre: "Design",
        author: "Alicia",
        stock: 4,
        image: "https://images.unsplash.com/photo-1743345258591-4f837fe8345b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
    },
    {
        id: 5,
        title: "The Black Forest",
        genre: "Fiction",
        author: "Jonathan",
        stock: 0,
        image: "https://images.unsplash.com/photo-1743345258591-4f837fe8345b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
    },
    {
        id: 6,
        title: "Catatan Seorang Frontend Developer",
        genre: "Programming",
        author: "Samuel",
        stock: 2,
        image: "https://images.unsplash.com/photo-1743345258591-4f837fe8345b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
    },
    {
        id: 7,
        title: "Tutorial Adobe Illustrator",
        genre: "Design",
        author: "Alicia",
        stock: 6,
        image: "https://images.unsplash.com/photo-1743345258591-4f837fe8345b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
    },
    {
        id: 8,
        title: "Hacking untuk Pemula",
        genre: "Cybersecurity",
        author: "Aquman",
        stock: 0,
        image: "https://images.unsplash.com/photo-1743345258591-4f837fe8345b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
    },
    {
        id: 9,
        title: "Komedi Receh Indonesia",
        genre: "Komedi",
        author: "Fajar",
        stock: 1,
        image: "https://images.unsplash.com/photo-1743345258591-4f837fe8345b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
    },
    {
        id: 10,
        title: "Mastering TailwindCSS",
        genre: "Programming",
        author: "Alicia",
        stock: 5,
        image: "https://images.unsplash.com/photo-1743345258591-4f837fe8345b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
    },
    {
        id: 11,
        title: "Petualangan Si Belang",
        genre: "Fiction",
        author: "Fajar",
        stock: 0,
        image: "https://images.unsplash.com/photo-1743345258591-4f837fe8345b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
    },
    {
        id: 12,
        title: "Tips Nulis Buku Digital",
        genre: "Education",
        author: "Samuel",
        stock: 3,
        image: "https://images.unsplash.com/photo-1743345258591-4f837fe8345b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
    },
    {
        id: 13,
        title: "Stand Up Comedy Guide",
        genre: "Komedi",
        author: "Aquman",
        stock: 2,
        image: "https://images.unsplash.com/photo-1743345258591-4f837fe8345b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
    },
    {
        id: 14,
        title: "Ilmu Parenting Zaman Now",
        genre: "Lifestyle",
        author: "Alicia",
        stock: 7,
        image: "https://images.unsplash.com/photo-1743345258591-4f837fe8345b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
    },
    {
        id: 15,
        title: "Menjadi Backend Developer",
        genre: "Programming",
        author: "Samuel",
        stock: 0,
        image: "https://images.unsplash.com/photo-1743345258591-4f837fe8345b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
    },
    {
        id: 16,
        title: "Fotografi Malam Hari",
        genre: "Hobby",
        author: "Aquman",
        stock: 2,
        image: "https://images.unsplash.com/photo-1743345258591-4f837fe8345b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
    },
    {
        id: 17,
        title: "Bercocok Tanam untuk Pemula",
        genre: "Hobby",
        author: "Fajar",
        stock: 4,
        image: "https://images.unsplash.com/photo-1743345258591-4f837fe8345b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
    },
    {
        id: 19,
        title: "Belajar Bahasa Jepang",
        genre: "Education",
        author: "Alicia",
        stock: 0,
        image: "https://images.unsplash.com/photo-1743345258591-4f837fe8345b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
    },
    {
        id: 20,
        title: "Dasar-dasar Machine Learning",
        genre: "Technology",
        author: "Jonathan",
        stock: 3,
        image: "https://images.unsplash.com/photo-1743345258591-4f837fe8345b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
    },
    {
        id: 21,
        title: "Pahami Docker dalam Sehari",
        genre: "Technology",
        author: "Samuel",
        stock: 2,
        image: "https://images.unsplash.com/photo-1743345258591-4f837fe8345b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
    }
];

export const User = [
    {
        name: "AMan Aja Dulu",
        uid: "UID0011",
        email: "aman@example.com",
    },
    {
        name: "Alicia",
        uid: "UID001",
        email: "alicia@example.com",
    },
    {
        name: "Samuel",
        uid: "UID002",
        email: "samuel@example.com",
    },
    {
        name: "Jonathan",
        uid: "UID003",
        email: "jonathan@example.com",
    },
    {
        name: "Fajar",
        uid: "UID004",
        email: "fajar@example.com",
    },
    {
        name: "Aquman",
        uid: "UID005",
        email: "aquman@example.com",
    }
];


export const D_NavLinks = [
    {
        link: '/dashboard',
        label: 'Dashboard'
    },
    {
        link: '/dashboard/books',
        label: 'Buku'
    },
    {
        link: '/dashboard/members',
        label: 'Anggota'
    },
    {
        link: '/dashboard/loans',
        label: 'Peminjaman'
    },
    {
        link: '/dashboard/returns',
        label: 'Pengembalian'
    }
]
export default function Dashboard() {

    return (
        <>
            {/* <D_Header items={D_NavLinks} /> */}
            <D_EmptyBook bookListItems={BookList} />
            <D_LoanBooks statusBukuItems={StatusBuku} />
            <D_ReturnBooks statusBukuItems={StatusBuku} />
        </>
    );
}
