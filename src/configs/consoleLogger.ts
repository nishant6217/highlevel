const savedConsole = { ...console };

export enum LogLevel {
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4,
  LOG = 5,
  NOTHING = 6,
}

const LOG_LEVEL = "INFO";

const currentLogLevel = LogLevel[LOG_LEVEL] || LOG_LEVEL;

const color = {
  red: "\x1B[31m",
  green: "\x1B[32m",
  yellow: "\x1B[33m",
  blue: "\x1B[34m",
  black: "\x1B[39m",
};

// Add log level to the console for better debugging
console.info = (...args: Array<unknown>) => {
  if (currentLogLevel < LogLevel.INFO) {
    return;
  }

  savedConsole.info(color.blue, "INFO:", ...args, color.black);
};

console.warn = (...args: Array<unknown>) => {
  if (currentLogLevel < LogLevel.WARN) {
    return;
  }

  savedConsole.warn(color.yellow, "WARN:", ...args, color.yellow);
};

console.error = (...args: Array<unknown>) => {
  if (currentLogLevel < LogLevel.ERROR) {
    return;
  }

  savedConsole.error(color.red, "ERROR:", ...args, color.black);
};

console.debug = (...args: Array<unknown>) => {
  if (currentLogLevel < LogLevel.DEBUG) {
    return;
  }

  savedConsole.debug(color.green, "DEBUG:", ...args, color.black);
};

// eslint-disable-next-line no-console
console.log = (...args: Array<unknown>) => {
  if (currentLogLevel < LogLevel.LOG) {
    return;
  }

  savedConsole.log(color.black, "LOG:", ...args, color.black);
};
