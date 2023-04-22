import accountService from "../services";

export default (dependencies) => {

  const authenticateAccount = async (request, response, next) => {
    try {
      const { email, password } = request.body;
      const { token, accountId } = await accountService.authenticate(email, password, dependencies);
      response.status(200).json({ token: `BEARER ${token}`, accountId: accountId });
    } catch (error) {
      response.status(401).json({ message: 'Unauthorised' });
    }
  };

  const createAccount = async (request, response, next) => {
    // Input
    const { firstName, lastName, email, password } = request.body;
    // Treatment
    const account = await accountService.registerAccount(firstName, lastName, email, password, dependencies);
    //output
    response.status(201).json(account)
  };
  const getAccount = async (request, response, next) => {
    //input
    const accountId = request.params.id;
    // Treatment
    const account = await accountService.getAccount(accountId, dependencies);
    //output
    response.status(200).json(account);
  };
  const listAccounts = async (request, response, next) => {
    // Treatment
    const accounts = await accountService.find(dependencies);
    //output
    response.status(200).json(accounts);
  };
  const updateAccount = async (request, response, next) => {
    // Input
    const id = request.params.id;
    const { firstName, lastName, email, password } = request.body;
    // Treatment
    const account = await accountService.getAccount(id, dependencies);
    if (account !== undefined) {
      const persistedAccount = await accountService.updateAccount(account.id, firstName, lastName, email, password, dependencies);
      response.status(200).json(persistedAccount);
    } else {
      response.status(404);
    }
  };
  const addFavouriteMovie = async (request, response, next) => {
    try {
      const { movieId } = request.body;
      console.log(movieId);
      const id = request.params.id;
      const account = await accountService.addFavouriteMovie(id, movieId, dependencies);
      response.status(200).json(account);
    } catch (err) {
      next(new Error(`Invalid Data ${err.message}`));
    }
  };
  const getFavouriteMovies = async (request, response, next) => {
    try {
      const id = request.params.id;
      const favouriteMovies = await accountService.getFavouriteMovies(id, dependencies);
      response.status(200).json(favouriteMovies);
    } catch (err) {
      next(new Error(`Invalid Data ${err.message}`));
    }
  };
  const deleteFavouriteMovie = async (request, response, next) => {
    try {
      const movieId = request.params.movie_id;
      const id = request.params.id;
      const account = await accountService.deleteFavouriteMovie(id, movieId, dependencies);
      response.status(200).json(account);
    } catch (err) {
      next(new Error(`Invalid Data ${err.message}`));
    }
  };
  const addFavouriteTv = async (request, response, next) => {
    try {
      const { movieId } = request.body;
      console.log(movieId);
      const id = request.params.id;
      const account = await accountService.addFavouriteTv(id, movieId, dependencies);
      response.status(200).json(account);
    } catch (err) {
      next(new Error(`Invalid Data ${err.message}`));
    }
  };
  const getFavouriteTv = async (request, response, next) => {
    try {
      const id = request.params.id;
      const favouriteTv = await accountService.getFavouriteTv(id, dependencies);
      console.log(favouriteTv);
      response.status(200).json(favouriteTv);
    } catch (err) {
      next(new Error(`Invalid Data ${err.message}`));
    }
  };
  const deleteFavouriteTv = async (request, response, next) => {
    try {
      const movieId = request.params.movie_id;
      const id = request.params.id;
      const account = await accountService.deleteFavouriteTv(id, movieId, dependencies);
      response.status(200).json(account);
    } catch (err) {
      next(new Error(`Invalid Data ${err.message}`));
    }
  };
  const verify = async (request, response, next) => {
    try {
      // Input
      const authHeader = request.headers.authorization;

      // Treatment

      const accessToken = authHeader.split(" ")[1];
      const user = await accountService.verifyToken(accessToken, dependencies);

      //output
      next();
    } catch (err) {
      //Token Verification Failed
      next(new Error(`Verification Failed ${err.message}`));
    }
  };

  return {
    authenticateAccount,
    createAccount,
    getAccount,
    listAccounts,
    updateAccount,
    addFavouriteMovie,
    getFavouriteMovies,
    deleteFavouriteMovie,
    addFavouriteTv,
    getFavouriteTv,
    deleteFavouriteTv,
    verify
  };
};
