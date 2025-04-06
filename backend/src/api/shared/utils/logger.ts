import { pino } from "pino";

/**
 * Logger instance for the application.
 * Uses pino-pretty for enhanced logging output in development environments.
 */
const transport = pino.transport({
  targets: [
    {
      target: "pino-pretty",
      options: {
        colorize: true,
        levelFirst: true,
        translateTime: "yyyy-dd-mm, h:MM:ss TT",
      },
    },
  ],
});

export const logger = pino(transport);
