import express from 'express';
import MoviesController from '../controllers/index.js';
import AccountsController from '../../accounts/controllers/index.js';

const createMoviesRouter = (dependencies) => {
  const router = express.Router();
  // load controllers with dependencies
  const moviesController = MoviesController(dependencies);
  const accountsController = AccountsController(dependencies);

  router.route('/*')
    .all(accountsController.verify);

  router.route('/:resource_id/images')
    .get(moviesController.getMovieImages);

  router.route('/:resource_id/reviews')
    .get(moviesController.getMovieReviews);

  router.route('/upcoming')
    .get(moviesController.getUpcomingMovies);

  router.route('/recommended')
    .post(moviesController.findRecommended);

  router.route('/:resource_id')
    .get(moviesController.getMovie);

  router.route('/')
    .get(moviesController.find);

  router.route('/:resource_id/similar')
    .get(moviesController.findSimilar);

  return router;
};
export default createMoviesRouter;
