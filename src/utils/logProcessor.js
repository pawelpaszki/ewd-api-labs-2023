import logger from "./logger";
import { formatUrl } from "./urlFormatter";
const fs = require('fs');

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

function getLogs() {
  const logs = [];
  const logsContents = fs.readFileSync('logs/api.log', 'utf-8');
  logsContents.split(/\r?\n/).forEach(line => {
    if (line.length > 0) {
      logs.push(JSON.parse(line));
    }
  });
  return logs;
}

function getLogsAnalytics() {
  const logs = getLogs();
  let analytics = {
    totalRequests: logs.length,
    logs: logs,
    successRequestsCount: 0,
    errorRequestsCount: 0,
    requestsCount: new Map()
  };
  if (logs.length > 0) {
    logs.forEach(log => {
      if (log.level === "info") {
        analytics.successRequestsCount++;
      } else {
        analytics.errorRequestsCount++;
      }
      if (!analytics.requestsCount.has(log.message.url)) {
        let stats = new Array();
        stats.push({ method: log.message.method, count: 1 });
        analytics.requestsCount.set(log.message.url, { "stats": stats });
      } else {
        let stats = analytics.requestsCount.get(log.message.url).stats;
        let endpointFound = false;
        stats.forEach(el => {
          if (el.method === log.message.method) {
            el.count = el.count + 1;
            endpointFound = true;
          }
        });
        if (!endpointFound) {
          stats.push({ method: log.message.method, count: 1 });
        }
        analytics.requestsCount.set(log.message.url, { "stats": stats });
      }
    });
  }
  return analytics;
}

module.exports = { processAndPersistLogs, getLogsAnalytics };