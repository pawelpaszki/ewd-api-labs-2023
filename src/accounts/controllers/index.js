import accountService from "../services";

export default (dependencies) => {

  const favouriteMoviesCollection = "favouriteMovies";
  const favouriteTvSeriesCollection = "favouriteTvSeries";
  const favouriteActorsCollection = "favouriteActors";

  const authenticateAccount = async (request, response, next) => {
    try {
      const { email, password } = request.body;
      const { token, accountId } = await accountService.authenticate(email, password, dependencies);
      response.status(200).json({ token: `BEARER ${token}`, accountId: accountId });
    } catch (error) {
      response.status(401).json({ message: 'Unauthorised' });
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
  const addToFavouriteCollection = async (request, response, next) => {
    console.log("got here");
    try {
      const accountId = request.params.id;
      const url = request.url.toString();
      const { id } = request.body;
      console.log(id);
      console.log(url);
      if (url.includes("movies")) {
        const account = await accountService.addToFavouriteCollection(accountId, id, favouriteMoviesCollection, dependencies);
        console.log(account);
        response.status(200).json(account);
      } else if (url.includes("tv")) {
        const account = await accountService.addToFavouriteCollection(accountId, id, favouriteTvSeriesCollection, dependencies);
        response.status(200).json(account);
      } else if (url.includes("actors")) {
        const account = await accountService.addToFavouriteCollection(accountId, id, favouriteActorsCollection, dependencies);
        response.status(200).json(account);
      } else {
        next(new Error(`Invalid collection ${url.substr(request.url.indexOf('/') + 1)}`));
      }
    } catch (err) {
      next(new Error(`Invalid Data ${err.message}`));
    }
  };
  const getFavouriteCollection = async (request, response, next) => {
    try {
      const url = request.url.toString();
      const accountId = request.params.id;
      if (url.includes("movies")) {
        const favouriteCollection = await accountService.getFavouriteCollection(accountId, favouriteMoviesCollection, dependencies);
        response.status(200).json(favouriteCollection);
      } else if (url.includes("tv")) {
        const favouriteCollection = await accountService.getFavouriteCollection(accountId, favouriteTvSeriesCollection, dependencies);
        response.status(200).json(favouriteCollection);
      } else if (url.includes("actors")) {
        const favouriteCollection = await accountService.getFavouriteCollection(accountId, favouriteActorsCollection, dependencies);
        response.status(200).json(favouriteCollection);
      } else {
        next(new Error(`Invalid collection ${url.substr(request.url.indexOf('/') + 1)}`));
      }
    } catch (err) {
      next(new Error(`Invalid Data ${err.message}`));
    }
  };
  const deleteFromFavouriteCollection = async (request, response, next) => {
    try {
      const url = request.url.toString();
      const accountId = request.params.id;
      const collectionResourceId = request.params.resource_id;
      if (url.includes("movies")) {
        const account = await accountService.deleteFromFavouriteCollection(accountId, collectionResourceId, favouriteMoviesCollection, dependencies);
        response.status(200).json(account);
      } else if (url.includes("tv")) {
        const account = await accountService.deleteFromFavouriteCollection(accountId, collectionResourceId, favouriteTvSeriesCollection, dependencies);
        response.status(200).json(account);
      } else if (url.includes("actors")) {
        const account = await accountService.deleteFromFavouriteCollection(accountId, collectionResourceId, favouriteActorsCollection, dependencies);
        response.status(200).json(account);
      } else {
        next(new Error(`Invalid collection ${url.substr(request.url.indexOf('/') + 1)}`));
      }
    } catch (err) {
      next(new Error(`Invalid Data ${err.message}`));
    }
  };
  const addToFantasyMovies = async (request, response, next) => {
    // Input
    const accountId = request.params.id;
    const { title, overview, runtime, productionCompanies, genres, releaseDate } = request.body;
    // Treatment
    const account = await accountService.addToFantasyMovies(accountId, title, overview, runtime, productionCompanies, genres, releaseDate, dependencies);
    //output
    response.status(201).json(account);
  };
  const getFantasyMovies = async (request, response, next) => {
    // Input
    const accountId = request.params.id;
    // Treatment
    const fantasyMovies = await accountService.getFantasyMovies(accountId, dependencies);
    //output
    response.status(201).json(fantasyMovies);
  };
  const getFantasyMovie = async (request, response, next) => {
    // Input
    const movieId = request.params.movie_id;
    const accountId = request.params.id;
    // Treatment
    const movie = await accountService.getFantasyMovie(accountId, movieId, dependencies);
    //output
    if (movie !== undefined) {
      response.status(201).json(movie)
    } else {
      response.status(404).send('Not found');
    }
  };
  // TODO - update
  const deleteFromFantasyMovies = async (request, response, next) => {
    // Input
    const { firstName, lastName, email, password } = request.body;
    // Treatment
    const account = await accountService.registerAccount(firstName, lastName, email, password, dependencies);
    //output
    response.status(201).json(account)
  };
  //   router.route('/:id/fantasy_movies')
  //   .post(accountsController.addToFantasyMovies);

  // router.route('/:id/fantasy_movies')
  //   .get(accountsController.getFantasyMovies);

  // router.route('/:id/fantasy_movies/:movie_id')
  //   .get(accountsController.getFantasyMovie);

  // router.route('/:id/fantasy_movies/:movie_id')
  //   .delete(accountsController.deleteFromFantasyMovies);

  return {
    authenticateAccount,
    createAccount,
    getAccount,
    listAccounts,
    updateAccount,
    addToFavouriteCollection,
    getFavouriteCollection,
    deleteFromFavouriteCollection,
    addToFantasyMovies,
    getFantasyMovies,
    getFantasyMovie,
    deleteFromFantasyMovies,
    verify
  };
};
