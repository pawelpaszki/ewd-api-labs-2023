import express from 'express';
import GenresController from '../controllers/index.js';
import AccountsController from '../../accounts/controllers/index.js';

const createRouter = (dependencies) => {
  const router = express.Router();
  // load controller with dependencies
  const genresController = GenresController(dependencies);
  const accountsController = AccountsController(dependencies);

  router.route('/*')
    .all(accountsController.verify);

  router.route('/')
    .get(genresController.listGenres);

  router.route('/:genre_id')
    .get(genresController.getGenre);

  return router;
};
export default createRouter;
