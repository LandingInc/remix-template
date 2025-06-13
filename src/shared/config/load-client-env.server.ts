import { env } from './env.server';

// Only define the envs that are used in the browser
export function loadClientEnv() {
  return {
    deployEnv: env.get('DEPLOY_ENV'),
  } as const;
}

export type ClientEnv = ReturnType<typeof loadClientEnv>;
