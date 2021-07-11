import { getLogger, Logger } from "log4js";

let loggerIns: Logger | null = null;

const createLogger = () => {
  if (!loggerIns) {
    const logger = getLogger();
    // logger.level = process.env.NODE_ENV === "production" ? "warn" : "debug";
    logger.level = "debug";

    return (loggerIns = logger);
  }

  return loggerIns;
};

export const logger = createLogger();
