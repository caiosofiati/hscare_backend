import pino from 'pino';
import path from 'path';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  
  transport: process.env.NODE_ENV !== 'production' 
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
          ignore: 'pid,hostname',
          singleLine: false,
        },
      }
    : undefined,

  base: {
    env: process.env.NODE_ENV || 'development',
  },

  timestamp: () => `,"time":"${new Date().toISOString()}"`,

  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
    bindings: (bindings) => {
      return {
        pid: bindings.pid,
        host: bindings.hostname,
      };
    },
  },

  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
});

export const createFileLogger = (filename: string) => {
  const logDir = path.join(process.cwd(), 'logs');
  const logPath = path.join(logDir, filename);

  return pino({
    level: process.env.LOG_LEVEL || 'info',
    
    transport: {
      targets: [
        {
          target: 'pino-pretty',
          level: 'info',
          options: {
            colorize: true,
            translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
            ignore: 'pid,hostname',
          },
        },
        {
          target: 'pino/file',
          level: 'trace',
          options: {
            destination: logPath,
            mkdir: true,
          },
        },
      ],
    },

    timestamp: () => `,"time":"${new Date().toISOString()}"`,
    
    formatters: {
      level: (label) => ({ level: label.toUpperCase() }),
    },
  });
};

export const logWithContext = (
  level: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal',
  message: string,
  context?: Record<string, any>
) => {
  logger[level]({ ...context }, message);
};

export const logError = (error: Error, context?: Record<string, any>) => {
  logger.error(
    {
      err: error,
      stack: error.stack,
      ...context,
    },
    error.message
  );
};

export const logPerformance = (
  operation: string,
  durationMs: number,
  context?: Record<string, any>
) => {
  logger.info(
    {
      operation,
      duration_ms: durationMs,
      ...context,
    },
    `Performance: ${operation}`
  );
};

export default logger;