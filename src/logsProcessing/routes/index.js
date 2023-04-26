import express from 'express';
import LogsController from '../controllers';

const createLogsRouter = (dependencies) => {
  const router = express.Router();
  // load controllers with dependencies
  const logsController = LogsController(dependencies);

  router.route("/*").all(logsController.verify);

  router.route('/')
    .get(logsController.getLogs);

  router.route('/analytics')
    .get(logsController.getLogsAnalytics);

  return router;
};
export default createLogsRouter;
