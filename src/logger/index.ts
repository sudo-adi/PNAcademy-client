
import pino, { Logger } from 'pino';

const prettyPrintOptions = {
  colorize: true,
  translateTime: 'yyyy-mm-dd HH:MM:ss',
  ignore: 'pid,hostname'
};

export const logger: Logger =
  process.env.NODE_ENV === 'production'
    ? 
    pino({
      level: 'warn',
    })
    :
    pino({
      transport: {
        target: 'pino-pretty',
        options: prettyPrintOptions,
      },
      level: 'debug',
    });
