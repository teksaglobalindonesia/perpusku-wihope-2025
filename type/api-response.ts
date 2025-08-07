  // ===== PAGINATION =====

  export interface Pagination {
    pagination: {
      page: number;
      page_size: number;
      total: number;
      page_count: number;
    };
  }

  // ===== BOOK =====

  export interface Cover {
    id: number;
    documentId: string;
    url: string;
    alternativeText: string | null;
    name: string;
    width: number;
    height: number;
  }

  export interface Category {
    id: number;
    documentId: string;
    name: string;
    createdAt: string;
  }

  export interface Book {
    id: number;
    documentId: string;
    title: string;
    writer: string;
    publisher: string;
    published_year: string;
    stock: number;
    createdAt: string;
    cover: Cover;
    categories: Category[];
  }

  export interface BookSummary {
    id: number;
    documentId: string;
    title: string;
    writer: string;
    publisher: string;
    published_year: string;
    stock: number;
    createdAt: string;
  }

  // ===== MEMBER =====

  export interface Member {
    id: number;
    documentId: string;
    name: string;
    email: string;
    address: string;
    id_member: string;
    createdAt: string;
  }

  // ===== RETURN =====

  export interface ReturnData {
    id: number;
    documentId: string;
    actual_return_date: string;
    createdAt: string;
  }

  // ===== LOAN =====

  export interface Loan {
    id: number;
    documentId: string;
    loan_date: string;
    return_date: string;
    createdAt: string;
    member: Member;
    book: BookSummary;
    return: ReturnData | null;
  }

  export interface ReturnRecord {
    id: number;
    documentId: string;
    loan_date: string;
    return_date: string;
    createdAt: string;
    member: Member;
    book: BookSummary;
    return: ReturnData;
  }
