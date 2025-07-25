import axios from 'axios';

type FetcherType = {
  path: string;
  query?: string;
  body?: object;
  headers?: object;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
};

export const fetcher = async ({
  path,
  query,
  body = {},
  headers = {},
  method = 'GET'
}: FetcherType) => {
  const url: string = `${process.env.NEXT_PUBLIC_BASE_URL}${
    query ? `${path}?${query}` : path
  }`;
  try {
    const response = await axios({
      method,
      url,
      headers,
      data: body
    });

    return {
      status: response?.status,
      data: response?.data
    };
  } catch (err: any) {
    return {
      status: err?.response?.status,
      data: err?.response?.data ?? { error: 'Unknown error' },
      err
    };
  }
};
