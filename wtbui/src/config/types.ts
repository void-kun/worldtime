export type HttpHeader = {
  [key: string]: string;
};

export type RequestConfig = {
  headers: HttpHeader;
};

export type RequestParams = {
  params: {
    [key: string]: string;
  };
};

export type APIConfig = {
  baseURL?: string;
};
