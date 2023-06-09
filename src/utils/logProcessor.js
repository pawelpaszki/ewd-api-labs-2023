import logger from "./logger.js";
import formatUrl from "./urlFormatter.js";
import fs from "fs";

export function processAndPersistLogs(level, request, status, accountId) {
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

export function getLogs() {
  const logs = [];
  const logsContents = fs.readFileSync('logs/api.log', 'utf-8');
  logsContents.split(/\r?\n/).forEach(line => {
    if (line.length > 0) {
      logs.push(JSON.parse(line));
    }
  });
  return logs;
}

export function getLogsAnalytics() {
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
        if (log.level === "info") {
          stats.push({ method: log.message.method, successCount: 1, failureCount: 0 });
        } else {
          stats.push({ method: log.message.method, successCount: 0, failureCount: 1 });
        }
        analytics.requestsCount.set(log.message.url, { "stats": stats });
      } else {
        let stats = analytics.requestsCount.get(log.message.url).stats;
        let endpointFound = false;
        stats.forEach(el => {
          if (el.method === log.message.method) {
            if (log.level === "info") {
              el.successCount = el.successCount + 1;
            } else {
              el.failureCount = el.failureCount + 1;
            }
            endpointFound = true;
          }
        });
        if (!endpointFound) {
          if (log.level === "info") {
            stats.push({ method: log.message.method, successCount: 1, failureCount: 0 });
          } else {
            stats.push({ method: log.message.method, successCount: 0, failureCount: 1 });
          }
        }
        analytics.requestsCount.set(log.message.url, { "stats": stats });
      }
    });
  }
  return analytics;
}