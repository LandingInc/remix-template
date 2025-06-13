const envs = () => {
  const DEPLOY_ENV = process.env.DEPLOY_ENV || 'development';

  return {
    DEPLOY_ENV,
    HOST: process.env.HOST || 'http://localhost:3000',
  };
};

const envFactory = () => {
  const env = envs();

  Object.entries(env).forEach(([key, value]) => {
    if (value === undefined) {
      throw new Error(`Environment variable ${key} is undefined`);
    }
  });

  return {
    get: (key: keyof typeof env) => {
      const value = env[key];
      if (value === undefined) {
        throw new Error(`Environment variable ${key} is undefined`);
      }

      return value;
    },
  };
};

export const env = envFactory();
