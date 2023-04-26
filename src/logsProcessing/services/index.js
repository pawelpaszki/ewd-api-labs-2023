import { getLogsAnalytics } from "../../utils/logProcessor";

export default {
  getLogsAnalytics: async () => {
    return getLogsAnalytics();
  },
  verifyToken: async (token, { tokenManager }) => {
    const decoded = await tokenManager.decodeLogs(token);
    if (decoded.user !== "logs-admin") {
      throw new Error('Bad token');
    }
    return decoded.user;
  }
};
