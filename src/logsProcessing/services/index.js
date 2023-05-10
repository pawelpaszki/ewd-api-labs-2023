import CustomError from "../../utils/errors/custom-error.js";
import { getLogsAnalytics } from "../../utils/logProcessor.js";

export default {
  getLogsAnalytics: async () => {
    return getLogsAnalytics();
  },
  verifyToken: async (token, { tokenManager }) => {
    const decoded = await tokenManager.decodeLogs(token);
    if (decoded.user !== "logs-admin") {
      throw new CustomError('BAD_TOKEN');
    }
    return decoded.user;
  }
};
