import express from 'express';
import MoviesController from '../controllers';
import AccountsController from '../../accounts/controllers';

const createMoviesRouter = (dependencies) => {
  const router = express.Router();
  // load controllers with dependencies
  const moviesController = MoviesController(dependencies);
  const accountsController = AccountsController(dependencies);

  router.route('/*')
    .all(accountsController.verify);

  router.route('/:id')
    .get(moviesController.getMovie);

  router.route('/')
    .get(moviesController.find);

  router.route('/upcoming')
    .get(moviesController.getUpcomingMovies);

  return router;
};
export default createMoviesRouter;
