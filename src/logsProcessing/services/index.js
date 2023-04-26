import axios from 'axios';

export default {
  getLogs: async () => {
    return {};
  },
  getLogsAnalytics: async (query) => {
    return {};
  },
  verifyToken: async (token, { tokenManager }) => {
    const decoded = await tokenManager.decodeLogs(token);
    if (decoded.user !== "logs-admin") {
      throw new Error('Bad token');
    }
    return decoded.user;
  }
};
