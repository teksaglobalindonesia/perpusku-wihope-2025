import axios from 'axios';
import { BASE_URL, AUTHORIZATION_TOKEN, WIHOPE_NAME } from '@/lib/constant';

type FetcherType = {
  path: string;
  query?: string | null;
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
    pageSize: 5
  }
}: FetcherType) => {
  const paginationQuery = `page=${pagination.page ?? 1}&page_size=${
    pagination.pageSize ?? 5
  }`;
  const url: string = `${BASE_URL}/api${
    query ? `${path}?${query}&${paginationQuery}` : `${path}?${paginationQuery}`
  }`;

  // console.log(url);

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

// https://cms-perpusku.widhimp.my.id/api/loan/list?status=loanednull&page=2&page_size=1
// https://cms-perpusku.widhimp.my.id/api/loan/list?page=1&page_size=1
