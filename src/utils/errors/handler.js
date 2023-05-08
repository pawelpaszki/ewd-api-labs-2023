const errorCodes = require('./error-codes');
import { processAndPersistLogs } from "../logProcessor";

function errorHandler(err, req, res, next) {
  const code = (err && err.code) || null;
  const accountId = (err && err.account_id) || "";
  const error = errorCodes[code] || errorCodes['INTERNAL_ERROR'];

  processAndPersistLogs("error", req, error.statusCode, accountId);

  return res
    .status(error.statusCode)
    .json({ error: error.error });
};

module.exports = errorHandler;