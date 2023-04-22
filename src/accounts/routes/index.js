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
    .post(accountsController.addFavouriteMovie);
    
  router.route('/:id/favourite_movies')
    .get(accountsController.getFavouriteMovies);

  router.route('/:id/favourite_movies/:movie_id')
    .delete(accountsController.deleteFavouriteMovie);

  return router;
};
export default createRouter;
