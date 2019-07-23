import config from '../configuration/config';

function canLog(): boolean {
  return (config.isDev && !config.isTest) || config.isTest;
}

const Logger = {
  log: (message: string, ...v: any[]) => {
    if (canLog()) {
      return console.log(message, ...v);
    }
  },
  error: (message: string, ...v: any[]) => {
    if (canLog()) {
      return console.warn(message, ...v);
    }
  },
};

export default Logger;
