export const BASE_URL = 'https://cms-perpusku.widhimp.my.id';
export const TOKEN = 'Bearer be3a43c769650f7c947ee879e3e8c4f3aafae7cac31aeab6fe6606443de5f75a1ef081cae81d0936d360c9c27fab55b1e31864538f4045914a085a395d4dc9b840e0b68dd6b9225a9bdf607d07dfab7fbee120ce17b7134a467f75a7858822f4a378fe2b23749c325464a84f02ff63ab302c8b64c7b923a9787dd6beba550ee5'
export const WIHOPE_NAME = 'alvin';

// const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
// const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN || '';

// export interface StrapiBook {
//   id: number;
//   attributes: {
//     judul: string;
//     genre: string;
//     penulis: string;
//     penerbit: string;
//     tahun: string;
//     stok: number;
//     gambar: string;
//     createdAt: string;
//     updatedAt: string;
//     publishedAt: string;
//   };
// }

// export interface Book {
//   id: number;
//   judul: string;
//   genre: string;
//   penulis: string;
//   penerbit: string;
//   tahun: string;
//   stok: number;
//   gambar: string;
// }

// export interface StrapiResponse {
//   data: StrapiBook[];
//   meta: {
//     pagination: {
//       page: number;
//       pageSize: number;
//       pageCount: number;
//       total: number;
//     };
//   };
// }

// // Mengonversi dari data Strapi ke data aplikasi
// function convertStrapiToBook(item: any): Book {
//   return {
//     id: item.id,
//     judul: item.judul,
//     penulis: item.penulis,
//     penerbit: item.penerbit,
//     stok: item.stok,
//     genre: item.genre,
//     tahun: item.tahun,
//     gambar: item.gambar,
//   };
// }


// // Ambil semua buku
// export async function getBooksFromStrapi(): Promise<Book[]> {
//   try {
//     const response = await fetch(`${STRAPI_URL}/api/bukus`, {
//       headers: {
//         Authorization: `Bearer ${STRAPI_TOKEN}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Gagal fetch semua buku: ${response.status}`);
//     }

//     const json: StrapiResponse = await response.json();
//     console.log("✅ Data mentah dari Strapi:", json); 
//     console.log("📚 Buku hasil fetch (mentah):", json.data);
// console.log("📚 Apakah array?", Array.isArray(json.data));
// console.log("Contoh data pertama dari Strapi:", json.data[0]);

//     return json.data.map(convertStrapiToBook);
//   } catch (error) {
//     console.error('❌ Error getBooksFromStrapi:', error);
//     throw error;
//   }
// }


// // Ambil buku berdasarkan ID
// export async function getBookByIdFromStrapi(id: number): Promise<Book> {
//   try {
//     const response = await fetch(`${STRAPI_URL}/api/bukus/${id}?populate=*`, {
//       headers: {
//         Authorization: `Bearer ${STRAPI_TOKEN}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Gagal fetch buku id ${id}: ${response.status}`);
//     }

//     const json = await response.json();
//     return convertStrapiToBook(json.data);
//   } catch (error) {
//     console.error('❌ Error getBookByIdFromStrapi:', error);
//     throw error;
//   }
// }

// // Tambahkan buku baru
// export async function createBookInStrapi(bookData: Omit<Book, 'id'>): Promise<Book> {
//   try {
//     const response = await fetch(`${STRAPI_URL}/api/bukus`, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${STRAPI_TOKEN}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ data: bookData }),
//     });

//     if (!response.ok) {
//       throw new Error(`Gagal create buku: ${response.status}`);
//     }

//     const json = await response.json();
//     return convertStrapiToBook(json.data);
//   } catch (error) {
//     console.error('❌ Error createBookInStrapi:', error);
//     throw error;
//   }
// }

// // Update buku
// export async function updateBookInStrapi(id: number, bookData: Partial<Book>): Promise<Book> {
//   try {
//     const response = await fetch(`${STRAPI_URL}/api/bukus/${id}`, {
//       method: 'PUT',
//       headers: {
//         Authorization: `Bearer ${STRAPI_TOKEN}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ data: bookData }),
//     });

//     if (!response.ok) {
//       throw new Error(`Gagal update buku id ${id}: ${response.status}`);
//     }

//     const json = await response.json();
//     return convertStrapiToBook(json.data);
//   } catch (error) {
//     console.error('❌ Error updateBookInStrapi:', error);
//     throw error;
//   }
// }

// // Hapus buku
// export async function deleteBookFromStrapi(id: number): Promise<boolean> {
//   try {
//     const response = await fetch(`${STRAPI_URL}/api/bukus/${id}`, {
//       method: 'DELETE',
//       headers: {
//         Authorization: `Bearer ${STRAPI_TOKEN}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Gagal hapus buku id ${id}: ${response.status}`);
//     }

//     return true;
//   } catch (error) {
//     console.error('❌ Error deleteBookFromStrapi:', error);
//     throw error;
//   }
// }
