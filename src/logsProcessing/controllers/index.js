import logsProcessingService from "./../services";

export default (dependencies) => {

  const verify = async (request, response, next) => {
    try {
      // Input
      const authHeader = request.headers.authorization;

      // Treatment
      const accessToken = authHeader.split(" ")[1];
      // not throwing an error means token is valid
      await logsProcessingService.verifyToken(accessToken, dependencies);
      next();
    } catch (err) {
      console.log(err);
      //Token Verification Failed
      response.status(401).json({ message: "Failed to verify requester identity" });
    }
  };
  const getLogs = async (request, response, next) => {
    try {
      // Treatment
      const logs = await logsProcessingService.getLogs(dependencies);
      //output
      response.status(200).json(logs);
    } catch (err) {
      response.status(500).json({ message: "failed to get logs" });
    }
  };
  const getLogsAnalytics = async (request, response, next) => {
    try {
      // Treatment
      const analytics = await logsProcessingService.getLogsAnalytics(dependencies);
      //output
      response.status(200).json(analytics);
    } catch (err) {
      response.status(500).json({ message: "failed to get analytics" });
    }
  };

  return {
    getLogs,
    getLogsAnalytics,
    verify
  };
};
