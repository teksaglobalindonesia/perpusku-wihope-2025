import axios from 'axios';
import { BASE_URL, AUTHORIZATION_TOKEN, WIHOPE_NAME } from '@/lib/constant';

type FetcherType = {
  path: string;
  query?: string | null;
  body?: object | FormData;
  headers?: object;
  withFile?: boolean;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  pagination?: {
    pageSize?: number;
    page?: number;
    isActive?: boolean;
  };
};

export const fetcher = async ({
  path,
  query,
  body = {},
  headers = {},
  withFile,
  method = 'GET',
  pagination = {
    page: 1,
    pageSize: 5,
    isActive: true
  }
}: FetcherType) => {
  const paginationQuery = `page=${pagination.page ?? 1}&page_size=${
    pagination.pageSize ?? 5
  }`;
  const url: string = `${BASE_URL}/api${
    query
      ? `${path}?${query}&${pagination.isActive ? paginationQuery : ''}`
      : `${path}${pagination.isActive ? `?${paginationQuery}` : ''}`
  }`;

  try {
    const response = await axios({
      method,
      url,
      headers: {
        'Content-Type': withFile ? 'multipart/form-data' : 'application/json',
        Authorization: `bearer ${AUTHORIZATION_TOKEN}`,
        'x-wihope-name': WIHOPE_NAME
      },
      data: body
    });
    return {
      status: response?.status,
      data: response?.data || []
    };
  } catch (err: any) {
    return {
      status: err?.response?.status,
      data: err?.response?.data ?? { error: 'Unknown error' },
      err
    };
  }
};

//
