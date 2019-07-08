import { merge } from 'lodash';

const config: { [key: string]: any } = {
  all: {
    env: process.env.NODE_ENV || 'development',
    isDev: process.env.NODE_ENV !== 'production',
    isTest: process.env.NODE_ENV === 'test',
  },
  development: {
    api: 'http://localhost:4000',
  },
  test: {
    api: 'http://localhost:4000',
  },
  production: {
    api: 'http://localhost:4000',
  },
};

export default merge(config[config.all.env], config.all);
