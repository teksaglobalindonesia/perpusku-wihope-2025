// lib/strapi.ts

export const BASE_URL = 'https://cms-perpusku.widhimp.my.id';
export const TOKEN =
  'Bearer be3a43c769650f7c947ee879e3e8c4f3aafae7cac31aeab6fe6606443de5f75a1ef081cae81d0936d360c9c27fab55b1e31864538f4045914a085a395d4dc9b840e0b68dd6b9225a9bdf607d07dfab7fbee120ce17b7134a467f75a7858822f4a378fe2b23749c325464a84f02ff63ab302c8b64c7b923a9787dd6beba550ee5';

export const WIHOPE_NAME = 'alvin';

// Tipe data untuk frontend
export interface Book {
  id: number;
  title: string;
  genre: string; // bisa dijadikan string[] kalau banyak
  writer: string;
  publisher: string;
  year: string;
  stock: number;
  gambar: string;
  categories?: BookCategory[];
}

export interface BookCategory {
  id: number;
  name: string;
  documentId: string;
  createdAt: string;
}

interface StrapiBook {
  id: number;
  documentId: string;
  title: string;
  writer: string;
  publisher: string;
  published_year: string;
  stock: number;
  cover: string | null;
  categories: BookCategory[];
}

interface StrapiResponse {
  data: StrapiBook[];
}


// Konversi dari Strapi ke format frontend
function convertStrapiToBook(item: StrapiBook): Book {
  return {
    id: item.id,
    title: item.title,
    genre: item.categories[0]?.name || '', // atau kosong kalau tidak ada
    writer: item.writer,
    publisher: item.publisher,
    year: item.published_year,
    stock: item.stock,
    gambar: item.cover || '', // gunakan cover jika ada
    categories: item.categories,
  };
} 

// Fungsi fetch
export async function getBooksFromStrapi(): Promise<Book[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/bukus?populate=*`, {
      headers: {
        Authorization: TOKEN,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Gagal fetch buku: ${response.status}`);
    }

    const json: StrapiResponse = await response.json();
    return json.data.map(convertStrapiToBook);
  } catch (error) {
    // console.error('❌ Error saat fetch books:', error);
    return [];
  }
}
