export const API_URL = "https://cms-perpusku.widhimp.my.id";
export const WIHOPE_NAME = "triadi";
export const TOKEN = "38f1bd91fcbf616c7a0fdad4be4e6fe110487040c7822d3f923fd8a46b3e9b513a971a48209818c8daa47ed0b93768613fd520051f322c869386765cf2a72ed4e8e500642902c5ebe8497cc79b7fcab7654b983d11e357733f0c3d2c63fabfcada10ba2bcb6ccbb9f920b05b3bcf0e24086c455f0f662d6b603b3697dd078e52";

interface FetchOptions {
    method?: string;
    headers?: Record<string, string>;
    cache?: RequestCache;
    body?: any;
}

export async function fetchAPI(
    endpoint: string,
    { method = 'GET', headers = {}, cache = 'no-store', body }: FetchOptions = {}
    ) {
    const defaultHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
        "x-wihope-name": WIHOPE_NAME,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: { ...defaultHeaders, ...headers },
        cache,
        body: body ? JSON.stringify(body) : undefined,
    });

    return response.json();
}

async function fetchList(endpoint: string, page = 1, pageSize = 9999) {
    const query = new URLSearchParams({
        page: String(page),
        page_size: String(pageSize)
    });
    return fetchAPI(`${endpoint}?${query}`);
}

//Fetch only for sacred books
export const fetchBooks = (page?: number, pageSize?: number) => {
    return fetchList("/api/book/list", page, pageSize);
}

export async function fetchBookSearch(keyword: string, page = 1, pageSize = 5) {
    try {
        const query = new URLSearchParams({
            page: String(page),
            page_size: String(pageSize),
            search: keyword
        });

        const res = await fetchAPI(`/api/book/list?${query}`);

        return Array.isArray(res?.data) ? res.data : [];
    } catch (err) {
        console.error("Gagal fetch book search:", err);
        return [];
    }
}

export async function addBook(file: File, bookData: any) {
    try {
        const formData = new FormData();
        
        formData.append("cover", file, file.name);
        
        const payload = {
            title: bookData.title,
            writer: bookData.writer,
            publisher: bookData.publisher,
            published_year: String(bookData.published_year).substring(0, 4), 
            stock: Number(bookData.stock),
            categories: bookData.categories || undefined
        };
        
        formData.append("data", JSON.stringify(payload));

        const res = await fetch(`${API_URL}/api/book/add`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
                "x-wihope-name": WIHOPE_NAME,
            },
            body: formData,
        });

        const responseData = await res.json();

        if (!res.ok) {
            throw new Error(responseData.message || `HTTP error! status: ${res.status}`);
        }

        return responseData;

    } catch (error) {
        console.error("Error in addBookWithCover:", error);
        throw error;
    }
}

export async function fetchBookById(documentId: string) {
    try {
        const url = `${API_URL}/api/book/detail?id=${documentId}`;
        console.log("Fetching book:", url);

        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
                "x-wihope-name": WIHOPE_NAME,
            },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status} - ${await res.text()}`);

        const text = await res.text();
        if (!text) {
            console.warn(`Empty response for documentId: ${documentId}`);
            return null;
        }

        const data = JSON.parse(text);
        console.log("API Response:", data);

        if (data?.data) {
            return Array.isArray(data.data) ? data.data[0] ?? null : data.data;
        }
        if (data?.id || data?.documentId) return data;

        return null;
    } catch (err) {
        console.error("Error in fetchBookById:", err);
        return null;
    }
}

export async function editBook(documentId: string, file: File | null, bookData: any){
    try{
        const formData = new FormData();

        if(file){
            formData.append("cover", file, file.name);
        }

        const payload = {
            title: bookData.title,
            writer: bookData.writer,
            publisher: bookData.publisher,
            published_year: String(bookData.published_year).substring(0, 4),
            stock: Number(bookData.stock),
            categories: bookData.categories || undefined
        }

        formData.append("documentId", documentId)
        formData.append("data", JSON.stringify(payload))

        const res = await fetch(`${API_URL}/api/book/edit`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
                "x-wihope-name": WIHOPE_NAME,
            },
            body: formData
        })
        const resData = await res.json();

        if(!res.ok){
            throw new Error(resData.message || `HTTP error! status: ${res.status}`)
        }
        return resData
    } catch (error){
        console.error("Error in editBook:", error)
        throw error
    }
}

export async function deleteBook(documentId: string) {
    try {
        const res = await fetch(`${API_URL}/api/book/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`,
                "x-wihope-name": WIHOPE_NAME,
            },
            body: JSON.stringify({
                documentId: documentId
            }),
            cache: 'no-store',
        });

        const resData = await res.json();

        if (!res.ok) {
            throw new Error(resData.message || `HTTP error! status: ${res.status}`);
        }

        return resData;

    } catch (error) {
        console.error("Error in deleteBook:", error);
        throw error;
    }
}

export async function updateBookStock(documentId: string, newStock: number){
    try{
        const payload = {
            documentId: documentId,
            data: {
                stock: newStock
            }
        }

        const res = await fetch(`${API_URL}/api/book/edit`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`,
                "x-wihope-name": WIHOPE_NAME,
            },
            body: JSON.stringify(payload)
        })
        const resData = await res.json()

        if(!res.ok){
            throw new Error(resData.message || `HTTP error! status: ${res.status}`)
        }
        return resData
    } catch (error){
        console.error("Error in updateBookStock:", error)
        throw error
    }
}

export async function decreaseBookStock(documentId: string, amount: number = 1){
    try{
        const book = await fetchBookById(documentId)
        const currentStock = book.stock || 0
        const newStock = Math.max(0, currentStock - amount)

        return await updateBookStock(documentId, newStock)
    } catch (error){
        console.error("Error in decreaseBookStock:", error)
        throw error
    }
}

export async function increaseBookStock(bookId: string) {
    try {
        const book = await fetchBookById(bookId);
        if (!book) return false;

        const res = await fetch(`${API_URL}/api/book/update/${bookId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
                "Content-Type": "application/json",
                "x-wihope-name": WIHOPE_NAME,
            },
            body: JSON.stringify({ stock: (book.stock ?? 0) + 1 }),
        });

        return res.ok;
    } catch {
        return false;
    }
}

//Categories, you were the chosen one! It was said that you would destroy the books, not join them! Bring Balance to the CRUD, not leave it in darkness
interface Category {
    id: number;
    documentId: string;
    name: string;
    createdAt?: string;
}

export async function fetchCategories(): Promise<Category[]> {
    try {
        const response = await fetchAPI("/api/book-category/list");
        return response.data || [];
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return [];
    }
}

export async function addCategories(categoriesData:{
    name: string
}){
    const res = await fetchAPI("/api/book-category/add", {
        method: "POST",
        body: { data: categoriesData }
    });
    return res;
}

//Fetch for our council members
export const fetchMembers = (page?: number, pageSize?: number) => {
    return fetchList("/api/member/list", page, pageSize);
}

export async function fetchMemberSearch(keyword: string, page = 1, pageSize = 5) {
    try{
        const query = new URLSearchParams({
            page: String(page),
            page_size: String(pageSize),
            search: keyword
        });

        const res = await fetchAPI(`/api/member/list?${query}`);

        return Array.isArray(res?.data) ? res.data : [];
    } catch (err) {
        console.error("Gagal fetch loan search:", err);
        return[];
    }
}

export async function fetchLoanMember(documentId: string) {
    try {
        const query = new URLSearchParams({
            id_member: documentId,
        });

        const res = await fetchAPI(`/api/loan/list?${query}`);

        return {
            data: Array.isArray(res?.data) ? res.data : [],
        };
    } catch (err) {
        console.error("Gagal fetch loan member:", err);
        return { data: [] };
    }
}

export async function addMember(memberData: {
    id_member: string;
    name: string;
    email: string;
    address: string;
}) {
    const res = await fetchAPI("/api/member/add", {
        method: "POST",
        body: { data: memberData }
    });
    return res;
}

export async function fetchMemberById(documentId: string) {
    try {
        const res = await fetch(`${API_URL}/api/member/detail?id=${documentId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
                "x-wihope-name": WIHOPE_NAME,
            }
        });

        const resData = await res.json();
        if (!res.ok) throw new Error(resData.message || `HTTP ${res.status}`);

        if (resData.data) {
            return Array.isArray(resData.data) ? resData.data[0] : resData.data;
        }
        return (resData.id || resData.documentId) ? resData : null;
    } catch (err) {
        console.error("Error in fetchMemberById:", err);
        throw err;
    }
}


export async function editMember(memberData: any) {
    try {
        const payload = {
            documentId: memberData.documentId,
            data: {
                name: memberData.name,
                email: memberData.email,
                address: memberData.address,
                id_member: memberData.id_member
            }
        };

        console.log("Sending edit request with payload:", payload);

        const res = await fetch(`${API_URL}/api/member/edit`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`,
                "x-wihope-name": WIHOPE_NAME,
            },
            body: JSON.stringify(payload),
            cache: 'no-store',
        });

        const responseData = await res.json();
        console.log("Edit response:", responseData);

        if (!res.ok) {
            throw new Error(responseData.message || `HTTP error! status: ${res.status}`);
        }

        return responseData;

    } catch (error) {
        console.error("Error in editMember:", error);
        throw error;
    }
}

export async function deleteMember(documentId: string){
    try{
        const res = await fetch(`${API_URL}/api/member/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`,
                "x-wihope-name": WIHOPE_NAME,
            },
            body: JSON.stringify({
                documentId: documentId
            }),
            cache: "no-store",
        })
        
        const resData = await res.json();

        if(!res.ok){
            throw new Error(resData.message || `HTTP error! status: ${res.status}`)
        }

        return resData
    } catch (error){
        console.error("Error in deleteMember:", error)
        throw error;
    }
}

//Trust only in the loans
export const fetchLoans = (page?: number, pageSize?: number) => {
    return fetchList("/api/loan/list", page, pageSize);
};

export async function fetchLoanSearch(keyword: string, page = 1, pageSize = 5) {
    try{
        const query = new URLSearchParams({
            page: String(page),
            page_size: String(pageSize),
            search: keyword
        });

        const res = await fetchAPI(`/api/loan/list?${query}`);

        return Array.isArray(res?.data) ? res.data : [];
    } catch (err) {
        console.error("Gagal fetch loan search:", err);
        return[];
    }
}

export async function addLoans(loansData: {
    book: string | null;
    member: string | null;
    loan_date: string | Date;
    return_date: string | Date;
}) {
    if (!loansData.book || !loansData.member || !loansData.loan_date || !loansData.return_date) {
        throw new Error("All fields are required");
    }

    const res = await fetchAPI("/api/loan/add", {
        method: "POST",
        body: { 
            data: {
                ...loansData,
                loan_date: new Date(loansData.loan_date),
                return_date: new Date(loansData.return_date)
            }
        }
    });
    return res;
}

export async function editLoan(loanDocumentId: string, updateData: {
    book_documentId?: string
    loan_date?: string | Date
    return_date?: string | Date
}) {
    try {
        const fmt = (d: any) => d instanceof Date ? d.toISOString().split('T')[0] : d;
        const body = {
            documentId: loanDocumentId,
            ...(updateData.book_documentId && { book: updateData.book_documentId }),
            ...(updateData.loan_date && { loan_date: fmt(updateData.loan_date) }),
            ...(updateData.return_date && { return_date: fmt(updateData.return_date) })
        };

        const res = await fetch(`${API_URL}/api/loan/edit`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`,
                "x-wihope-name": WIHOPE_NAME,
            },
            body: JSON.stringify(body)
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

        return data.data
            ? (Array.isArray(data.data) ? data.data[0] : data.data)
            : ((data.id || data.documentId) ? data : null);
    } catch (err) {
        console.error("Error in editLoan:", err);
        throw err;
    }
}


export async function deleteLoan(id: string) {
    const res = await fetch(`${API_URL}/api/loan/delete`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${TOKEN}`,
            "x-wihope-name": WIHOPE_NAME,
        },
        body: JSON.stringify({ documentId: id }),
        cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
    return data;
}


//Don't underestimate the power of the return side
export const fetchReturn = (page?: number, pageSize?: number) => {
    return fetchList("/api/return/list", page, pageSize)
}

export async function fetchReturnSearch(keyword: string, page = 1, pageSize = 5) {
    try{
        const query = new URLSearchParams({
            page: String(page),
            page_size: String(pageSize),
            search: keyword
        });

        const res = await fetchAPI(`/api/return/list?${query}`);

        return Array.isArray(res?.data) ? res.data : [];
    } catch (err) {
        console.error("Gagal fetch loan search:", err);
        return[];
    }
}

export async function addReturns(returnsData: {
    loan: string
    actual_return_date: string | Date;
}) {
    if (!returnsData.loan || !returnsData.actual_return_date) {
        throw new Error("All fields are required");
    }

    const res = await fetchAPI("/api/return/add", {
        method: "POST",
        body: { 
            data: {
                ...returnsData,
                actual_return_date: new Date(returnsData.actual_return_date)
            }
        }
    });
    return res;
}

export async function deleteReturns(id: string) {
    const res = await fetch(`${API_URL}/api/loan/delete`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${TOKEN}`,
            "x-wihope-name": WIHOPE_NAME,
        },
        body: JSON.stringify({ documentId: id }),
        cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
    return data;
}



// export async function fetchLoanbyMemberId(documentId: string){
//     try{
//         console.log("Fetching loan with member documentId:", documentId)
//         console.log("API URL:", `${API_URL}/api/loan/list?id_member=${documentId}`)

//         const res = await fetch(`${API_URL}/api/loan/list?id_member=${documentId}`, {
//             method: "GET",
//             headers: {
//                 "Authorization": `Bearer ${TOKEN}`,
//                 "x-wihope-name": WIHOPE_NAME,
//             }
//         })
//         const resData = await res.json()
//         console.log("API Response:", resData)

//         if(!res.ok){
//             throw new Error(resData.message || `HTTP error! status: ${res.status}`)
//         }
        
//         let loans = []

//         if(resData.data && Array.isArray(resData.data)){
//             loans = resData.data
//         } else if(resData.data && typeof resData.data === `object` && !Array.isArray(resData.data)){
//             loans = [resData.data]
//         } else if(resData.id || resData.documentId){
//             loans = [resData]
//         }

//         return loans
//     } catch (error){
//         console.error("Error in fetchLoanByMemberDocumentId:", error)
//         throw error
//     }
// }