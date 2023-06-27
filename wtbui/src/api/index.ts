import ApiClient from '@/api/http';
import TimezoneService from '@/api/modules/timezone';
import env from '@/config/env';
import { APIConfig } from '@/config/types';

/**
 * API configuration
 */
const apiConfig: APIConfig = {
  baseURL: env.BASE_API,
};

/**
 * Init the timezone service
 */
const timezoneService = new TimezoneService(new ApiClient(apiConfig));

export { timezoneService };
