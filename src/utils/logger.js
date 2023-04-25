import { createLogger, transports, format } from "winston";
const { combine, timestamp } = format;

const myFormatter = format((info) => {
  return info;
})();

const logger = createLogger({
  format: combine(
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    myFormatter,
    format.json(),
  ),
  transports: [
    new transports.File({
      filename: "logs/api.log",
    }),
    new transports.Console(),
  ],
});

export default logger;