import axios from 'axios';
import env from '@/config/env';

const guessAPI = axios.create({
  baseURL: env.BASE_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { guessAPI };
