import env from '@/config/env';

const isProduction = env.NODE_ENV === 'production';

function log(message: string): void {
  if (isProduction === false) {
    if (typeof message !== undefined) {
      console.log(message);
    }
  }
}

export { log };
