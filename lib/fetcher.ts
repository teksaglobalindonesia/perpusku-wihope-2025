import axios from 'axios';
import { BASE_URL, AUTHORIZATION_TOKEN, WIHOPE_NAME } from './constant';

type a = {
  [key: string]: any;
};

type FetcherType = {
  path: string;
  query?: string;
  body?: object;
  headers?: object;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  pagination?: {
    pageSize?: number;
    page?: number;
  };
};

export const fetcher = async ({
  path,
  query,
  body = {},
  headers = {},
  method = 'GET',
  pagination = {
    page: 1,
    pageSize: 10
  }
}: FetcherType) => {
  // const paginationQuery = `page=${pagination.page}&page_size=${pagination.pageSize}`;
  const paginationQuery = '';
  const url: string = `${BASE_URL}/api${
    query ? `${path}?${query}` : `${path}`
  }`;
  try {
    const response = await axios({
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
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
