import { createLogger, transports } from "winston";

export const logger = () =>
  createLogger({
    handleExceptions: true,
    level: "debug",
    transports: [new transports.Console()],
  });
