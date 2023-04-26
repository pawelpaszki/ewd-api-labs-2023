import express from 'express';
import ActorsController from '../controllers';
import AccountsController from '../../accounts/controllers';

const createActorsRouter = (dependencies) => {
  const router = express.Router();
  // load controllers with dependencies
  const actorsController = ActorsController(dependencies);
  const accountsController = AccountsController(dependencies);

  router.route('/*')
    .all(accountsController.verify);

  router.route('/')
    .get(actorsController.find);

  router.route('/search')
    .get(actorsController.search);

  router.route('/:resource_id/images')
    .get(actorsController.getPersonImages);

  router.route('/:resource_id')
    .get(actorsController.getActor);

  return router;
};
export default createActorsRouter;
