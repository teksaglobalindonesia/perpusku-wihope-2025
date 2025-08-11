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

export async function fetchBooks() {
    return fetchAPI("/api/book/list");
}

export async function fetchMembers() {
    return fetchAPI("/api/member/list");
}

export async function fetchLoans() {
    return fetchAPI("/api/loan/list")
}

export async function fetchReturn() {
    return fetchAPI("/api/return/list")
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

        const response = await fetch(`${API_URL}/api/book/add`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
                "x-wihope-name": WIHOPE_NAME,
            },
            body: formData,
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
        }

        return responseData;

    } catch (error) {
        console.error("Error in addBookWithCover:", error);
        throw error;
    }
}





// export async function addBook(bookData: {
//     title: string;
//     writer: string;
//     publisher: string;
//     published_year: string;
//     stock: number;
//     categories?: string[];
// }, coverImageFile: File) {
//     const formData = new FormData();

//     formData.append('cover', coverImageFile);

//     formData.append('data', JSON.stringify(bookData));

//     const res = await fetch(`${API_URL}/api/book/add`, {
//         method: 'POST',
//         headers: {
//         'Authorization': TOKEN,
//         'x-wihope-name': WIHOPE_NAME,
//         },
//         body: formData,
//     });
//     if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//     }

//     const json = await res.json();
//     return json;
// }