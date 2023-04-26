import logger from "./logger";
import { formatUrl } from "./urlFormatter";

function processAndPersistLogs(level, request, status, accountId) {
  let logObj = {method: request.method, url: formatUrl(request), status: status};
  if (accountId !== "") {
    logObj.accountId = accountId;
  }
  if (level === "info") {
    logger.info(logObj);
  } else {
    logger.error(logObj);
  }
}

module.exports = { processAndPersistLogs };