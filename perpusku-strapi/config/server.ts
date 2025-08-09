import { EnvFn } from '../types/generated/env';

export default ({ env }: { env: EnvFn }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS')
  }
});
