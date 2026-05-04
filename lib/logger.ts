type LogLevel = 'debug' | 'info' | 'warn' | 'error';

type LogMetadata = Record<string, string | number | boolean | null | undefined>;

type LogEntry = {
  timestamp: string;
  level: LogLevel;
  message: string;
  service: 'cielitoswrld';
  requestId?: string;
  route?: string;
  metadata?: LogMetadata;
};

function writeLog(entry: LogEntry) {
  const line = JSON.stringify(entry);

  if (entry.level === 'error') {
    console.error(line);
    return;
  }

  if (entry.level === 'warn') {
    console.warn(line);
    return;
  }

  // eslint-disable-next-line no-console -- structured logging to stdout, not console.error
  console.info(line);
}

function log(level: LogLevel, message: string, context: Omit<LogEntry, 'timestamp' | 'level' | 'message' | 'service'> = {}) {
  writeLog({
    timestamp: new Date().toISOString(),
    level,
    message,
    service: 'cielitoswrld',
    ...context,
  });
}

export const logger = {
  debug: (message: string, context?: Omit<LogEntry, 'timestamp' | 'level' | 'message' | 'service'>) =>
    log('debug', message, context),
  info: (message: string, context?: Omit<LogEntry, 'timestamp' | 'level' | 'message' | 'service'>) =>
    log('info', message, context),
  warn: (message: string, context?: Omit<LogEntry, 'timestamp' | 'level' | 'message' | 'service'>) =>
    log('warn', message, context),
  error: (message: string, context?: Omit<LogEntry, 'timestamp' | 'level' | 'message' | 'service'>) =>
    log('error', message, context),
};

export function getErrorMetadata(error: unknown): LogMetadata {
  if (error instanceof Error) {
    return {
      errorName: error.name,
      errorMessage: error.message,
    };
  }

  return {
    errorMessage: 'Unknown error',
  };
}
