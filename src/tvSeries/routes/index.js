import express from 'express';
import TvSeriesController from '../controllers';
import AccountsController from '../../accounts/controllers';

const createTvSeriesRouter = (dependencies) => {
  const router = express.Router();
  // load controllers with dependencies
  const tvSeriesController = TvSeriesController(dependencies);
  const accountsController = AccountsController(dependencies);

  router.route('/*')
    .all(accountsController.verify);

  router.route('/recommended')
    .post(tvSeriesController.findRecommended);

  router.route('/:resource_id')
    .get(tvSeriesController.getTvSeries);

  router.route('/:resource_id/similar')
    .get(tvSeriesController.findSimilar);

  router.route('/:resource_id/images')
    .get(tvSeriesController.getMovieImages);

  router.route('/')
    .get(tvSeriesController.find);

  return router;
};
export default createTvSeriesRouter;
