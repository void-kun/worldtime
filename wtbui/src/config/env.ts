interface ENV {
  NODE_ENV: string;
  BASE_API: string;
}

function getEnv(): ENV {
  return {
    NODE_ENV: 'development',
    BASE_API: 'http://localhost:3000/api/v1/',
  };
}

const env = getEnv();
export default env;
