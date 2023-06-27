import { log } from '@/config/logger';

export const handleError = (error: Error) => {
  log(error.message);
};
