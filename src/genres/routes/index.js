import express from 'express';
import GenresController from '../controllers';

const createRouter = (dependencies) => {
  const router = express.Router();
  // load controller with dependencies
  const genresController = GenresController(dependencies);
  
  router.route('/')
    .get(genresController.listGenres);

  router.route('/:genre_id')
    .get(genresController.getGenre);

  return router;
};
export default createRouter;
