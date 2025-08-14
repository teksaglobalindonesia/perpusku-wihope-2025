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

export const fetchBooks = (page?: number, pageSize?: number) => {
    return fetchList("/api/book/list", page, pageSize);
}

export const fetchMembers = (page?: number, pageSize?: number) => {
    return fetchList("/api/member/list", page, pageSize);
}

export const fetchLoans = (page?: number, pageSize?: number) => {
    return fetchList("/api/loan/list", page, pageSize);
};

export const fetchReturn = (page?: number, pageSize?: number) => {
    return fetchList("/api/return/list", page, pageSize)
}

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

export async function addCategories(categoriesData:{
    name: string
}){
    const res = await fetchAPI("/api/book-category/add", {
        method: "POST",
        body: { data: categoriesData }
    });
    return res;
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

export async function fetchBookById(documentId: string) {
    try {
        console.log("Fetching book with documentId:", documentId);
        console.log("API URL:", `${API_URL}/api/book/detail?id=${documentId}`);
        
        const res = await fetch(`${API_URL}/api/book/detail?id=${documentId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
                "x-wihope-name": WIHOPE_NAME,
            },
        });

        const resData = await res.json();
        console.log("API Response:", resData);

        if (!res.ok) {
            throw new Error(resData.message || `HTTP error! status: ${res.status}`);
        }

        let book = null;
        
        if (resData.data && typeof resData.data === 'object' && !Array.isArray(resData.data)) {
            book = resData.data;
        }
        else if (resData.data && Array.isArray(resData.data) && resData.data.length > 0) {
            book = resData.data[0];
        }
        else if (resData.id || resData.documentId) {
            book = resData;
        }

        if (!book) {
            throw new Error("Book not found in response");
        }

        return book;
    } catch (error) {
        console.error("Error in fetchBookById:", error);
        throw error;
    }
}

export async function editBook(
    documentId: string,
    file: File | null,
    bookData: any
){
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

export async function fetchMemberById(documentId: string){
    try{
        console.log("Fetching member with documentId:", documentId)
        console.log("API URL:", `${API_URL}/api/member/detail?id=${documentId}`)

        const res = await fetch(`${API_URL}/api/member/detail?id=${documentId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
                "x-wihope-name": WIHOPE_NAME,
            }
        })

        const resData = await res.json()
        console.log("API Response:", resData)

        if(!res.ok){
            throw new Error(resData.message || `HTTP error! status: ${res.status}`)
        }

        let member = null;

        if(resData.data && typeof resData.data === 'object' && !Array.isArray(resData.data)){
            member = resData.data
        } else if(resData.data && Array.isArray(resData.data) && resData.data.length > 0){
            member = resData.data[0]
        } else if(resData.id || resData.documentId){
            member = resData
        }
        return member
    } catch (error){
        console.error("Error in fetchMemberById:", error)
        throw error
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
                "Authorization": `Bearer ${TOKEN}`, // Tambahkan Bearer jika perlu
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

export async function increaseBookStock(documentId: string, amount: number = 1) {
    try{
        const book = await fetchBookById(documentId)
        const currentStock = book.stock || 0
        const newStock = currentStock + amount

        return await updateBookStock(documentId, newStock)
    } catch (error){
        console.error("Error in increaseBookStock:", error)
        throw error
    }
}