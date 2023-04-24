import express from 'express';
import AccountsController from '../controllers';
import ValidationController from '../controllers/ValidationController'; //add to import statements at top of file

const createRouter = (dependencies) => {
  const validationController = ValidationController(dependencies);
  const router = express.Router();
  // load controller with dependencies
  const accountsController = AccountsController(dependencies);
  router.route('/')
    .post(validationController.validateAccount, accountsController.createAccount);

  router.route('/')
    .get(accountsController.listAccounts);

  router.route('/:id')
    .get(accountsController.getAccount);

  router.route('/:id')
    .put(accountsController.updateAccount);

  router.route('/security/token')
    .post(accountsController.authenticateAccount);

  router.route('/:id/favourite_movies')
    .post(accountsController.addToFavouriteCollection);
    
  router.route('/:id/favourite_movies')
    .get(accountsController.getFavouriteCollection);

  router.route('/:id/favourite_movies/:resource_id')
    .delete(accountsController.deleteFromFavouriteCollection);
  
  router.route('/:id/favourite_tv')
    .post(accountsController.addToFavouriteCollection);
    
  router.route('/:id/favourite_tv')
    .get(accountsController.getFavouriteCollection);

  router.route('/:id/favourite_tv/:resource_id')
    .delete(accountsController.deleteFromFavouriteCollection);

  router.route('/:id/favourite_actors')
    .post(accountsController.addToFavouriteCollection);
    
  router.route('/:id/favourite_actors')
    .get(accountsController.getFavouriteCollection);

  router.route('/:id/favourite_actors/:resource_id')
    .delete(accountsController.deleteFromFavouriteCollection);

  router.route('/:id/fantasy_movies')
    .post(accountsController.addToFantasyMovies);
    
  router.route('/:id/fantasy_movies')
    .get(accountsController.getFantasyMovies);
  
  router.route('/:id/fantasy_movies/:movie_id')
    .get(accountsController.getFantasyMovie);

  router.route('/:id/fantasy_movies/:movie_id/cast')
    .post(accountsController.addToFantasyMoviesCast);
  
  router.route('/:id/fantasy_movies/:movie_id')
    .delete(accountsController.deleteFromFantasyMovies);

  router.route('/:id/fantasy_movies/:movie_id/cast/:cast_id')
    .delete(accountsController.deleteFromFantasyMoviesCast);

  return router;
};
export default createRouter;
