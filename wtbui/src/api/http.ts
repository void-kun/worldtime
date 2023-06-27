import axios, { AxiosInstance } from 'axios';
import { APIConfig, RequestConfig, RequestParams } from '@/config/types';
import { handleError } from '@/api/error';
import env from '@/config/env';

export const apiConfig: APIConfig = {
  baseURL: env.BASE_API,
};

/**
 * IApiClient: Interface API base
 */
export interface IApiClient {
  post<TRequest, TResponse>(
    path: string,
    object: TRequest,
    config?: RequestConfig
  ): Promise<TResponse>;

  get<TResponse>(path: string, config?: RequestParams): Promise<TResponse>;
}

/**
 * ApiClient: Class API base
 */
export default class ApiClient implements IApiClient {
  private client: AxiosInstance;

  protected createAxiosClient(config: APIConfig): AxiosInstance {
    return axios.create({
      baseURL: config.baseURL,
      responseType: 'json' as const,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: env.API_TIMEOUT,
    });
  }

  constructor(config: APIConfig) {
    this.client = this.createAxiosClient(config);
  }

  async post<TRequest, TResponse>(
    path: string,
    payload: TRequest,
    config?: RequestConfig
  ): Promise<TResponse> {
    try {
      const response = await this.client.post<TResponse>(path, payload, config);
      return response.data;
    } catch (error) {
      handleError(error as Error);
    }
    return {} as TResponse;
  }

  async get<TResponse>(
    path: string,
    config?: RequestParams
  ): Promise<TResponse> {
    try {
      const response = await this.client.get<TResponse>(path, config);
      return response.data;
    } catch (error) {
      handleError(error as Error);
    }
    return {} as TResponse;
  }
}
