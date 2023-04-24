import accountService from "../services";
import { validateParams } from "../../utils/paramsValidator";

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
      response.status(401).json({ message: "Failed to verify requester identity" });
    }
  };
  const createAccount = async (request, response, next) => {
    try {
      // Input
      const { firstName, lastName, email, password } = request.body;
      // Treatment
      const account = await accountService.registerAccount(firstName, lastName, email, password, dependencies);
      //output
      response.status(201).json(account);
    } catch (e) {
      response.status(500).json({ message: "Failed to create account" });
    }
  };
  const getAccount = async (request, response, next) => {
    try {
      //input
      const accountId = request.params.id;
      await validateParams(request);
      // Treatment
      const account = await accountService.getAccount(accountId, dependencies);
      if (account !== undefined) {
        //output
        response.status(200).json(account);
      } else {
        //output
        response.status(404).json({ message: `account with id: ${accountId} not found` });
      }
    } catch (error) {
      response.status(500).json({ message: "Failed to get an account" });
    }
  };
  const listAccounts = async (request, response, next) => {
    try {
      // Treatment
      const accounts = await accountService.find(dependencies);
      //output
      response.status(200).json(accounts);
    } catch (error) {
      response.status(500).json({ message: "Failed to list accounts" });
    }
  };
  const updateAccount = async (request, response, next) => {
    try {
      // Input
      const accountId = request.params.id;
      await validateParams(request);
      const { firstName, lastName, email, password } = request.body;
      // Treatment
      const account = await accountService.getAccount(id, dependencies);
      if (account !== undefined) {
        const persistedAccount = await accountService.updateAccount(account.id, firstName, lastName, email, password, dependencies);
        response.status(200).json(persistedAccount);
      } else {
        response.status(404).json({ message: `account with id: ${accountId} not found` });
      }
    } catch (error) {
      response.status(500).json({ message: "Failed to update accounts" });
    }
  };
  const addToFavouriteCollection = async (request, response, next) => {
    try {
      let account = undefined;
      const accountId = request.params.id;
      await validateParams(request);
      const url = request.url.toString();
      const { id } = request.body;
      if (url.includes("movies")) {
        account = await accountService.addToFavouriteCollection(accountId, id, favouriteMoviesCollection, dependencies);
      } else if (url.includes("tv")) {
        account = await accountService.addToFavouriteCollection(accountId, id, favouriteTvSeriesCollection, dependencies);
      } else if (url.includes("actors")) {
        account = await accountService.addToFavouriteCollection(accountId, id, favouriteActorsCollection, dependencies);
      } else {
        throw new Error(`Invalid collection ${url.substr(request.url.indexOf('/') + 1)}`);
      }
      if (account !== undefined) {
        response.status(200).json(account);
      } else {
        response.status(404).json({ message: `account with id: ${accountId} not found` });
      }
    } catch (err) {
      response.status(500).json({ message: "Failed to add to favourite collection" });
    }
  };
  const getFavouriteCollection = async (request, response, next) => {
    try {
      let favouriteCollection = undefined;
      const url = request.url.toString();
      const accountId = request.params.id;
      await validateParams(request);
      if (url.includes("movies")) {
        favouriteCollection = await accountService.getFavouriteCollection(accountId, favouriteMoviesCollection, dependencies);
      } else if (url.includes("tv")) {
        favouriteCollection = await accountService.getFavouriteCollection(accountId, favouriteTvSeriesCollection, dependencies);
      } else if (url.includes("actors")) {
        favouriteCollection = await accountService.getFavouriteCollection(accountId, favouriteActorsCollection, dependencies);
      } else {
        throw new Error(`Invalid collection ${url.substr(request.url.indexOf('/') + 1)}`);
      }
      if (favouriteCollection !== undefined) {
        response.status(200).json(favouriteCollection);
      } else {
        response.status(404).json({ message: `account with id: ${accountId} not found` });
      }
    } catch (err) {
      response.status(500).json({ message: "Failed to get favourite collection" });
    }
  };
  const deleteFromFavouriteCollection = async (request, response, next) => {
    try {
      let account = undefined;
      const url = request.url.toString();
      const accountId = request.params.id;
      const collectionResourceId = request.params.resource_id;
      if (url.includes("movies")) {
        account = await accountService.deleteFromFavouriteCollection(accountId, collectionResourceId, favouriteMoviesCollection, dependencies);
      } else if (url.includes("tv")) {
        account = await accountService.deleteFromFavouriteCollection(accountId, collectionResourceId, favouriteTvSeriesCollection, dependencies);
      } else if (url.includes("actors")) {
        account = await accountService.deleteFromFavouriteCollection(accountId, collectionResourceId, favouriteActorsCollection, dependencies);
      } else {
        throw new Error(`Invalid collection ${url.substr(request.url.indexOf('/') + 1)}`);
      }
      if (account !== undefined) {
        response.status(200).json();
      } else {
        response.status(404).json({ message: `account with id: ${accountId} not found` });
      }
    } catch (err) {
      response.status(500).json({ message: "Failed to delete from favourite collection" });
    }
  };
  const addToFantasyMovies = async (request, response, next) => {
    try {
      // Input
      const accountId = request.params.id;
      await validateParams(request);
      const { title, overview, runtime, productionCompanies, genres, releaseDate } = request.body;
      // Treatment
      const account = await accountService.addToFantasyMovies(accountId, title, overview, runtime, productionCompanies, genres, releaseDate, dependencies);
      //output
      if (account !== undefined) {
        response.status(201).json(account);
      } else {
        response.status(404).json({ message: `account with id: ${accountId} not found` });
      }
    } catch (err) {
      response.status(500).json({ message: "Failed to add to fantasy movies" });
    }
  };
  const getFantasyMovies = async (request, response, next) => {
    try {
      // Input
      const accountId = request.params.id;
      await validateParams(request);
      // Treatment
      const fantasyMovies = await accountService.getFantasyMovies(accountId, dependencies);
      //output
      if (fantasyMovies !== undefined) {
        response.status(200).json(fantasyMovies);
      } else {
        response.status(404).json({ message: `account with id: ${accountId} not found` });
      }
    } catch (err) {
      response.status(500).json({ message: "Failed to get fantasy movies" });
    }
  };
  const getFantasyMovie = async (request, response, next) => {
    try {
      // Input
      const movieId = request.params.movie_id;
      const accountId = request.params.id;
      await validateParams(request);
      // Treatment
      const { account, movie } = await accountService.getFantasyMovie(accountId, movieId, dependencies);
      //output
      if (account !== undefined) {
        if (movie !== undefined) {
          response.status(200).json(movie);
        } else {
          response.status(404).json({ message: `movie with id: ${movieId} not found` });
        }
      } else {
        response.status(404).json({ message: `account with id: ${accountId} not found` });
      }
    } catch (err) {
      response.status(500).json({ message: "Failed to get fantasy movie" });
    }
  };
  const deleteFromFantasyMovies = async (request, response, next) => {
    try {
      // Input
      const accountId = request.params.id;
      const movieId = request.params.movie_id;
      await validateParams(request);
      // Treatment
      const account = await accountService.deleteFromFantasyMovies(accountId, movieId, dependencies);
      //output
      if (account !== undefined) {
        response.status(200).json();
      } else {
        response.status(404).json({ message: `account with id: ${accountId} not found` });
      }
    } catch (err) {
      response.status(500).json({ message: "Failed to delete from fantasy movies" });
    }
  };

  const addToFantasyMoviesCast = async (request, response, next) => {
    try {
      // Input
      const accountId = request.params.id;
      const movieId = request.params.movie_id;
      await validateParams(request);
      const { name, roleName, description } = request.body;
      // Treatment
      const account = await accountService.addToFantasyMoviesCast(accountId, movieId, name, roleName, description, dependencies);
      //output
      if (account !== undefined) {
        response.status(201).json(account);
      } else {
        response.status(404).json({ message: `account with id: ${accountId} not found` });
      }
    } catch (err) {
      response.status(500).json({ message: "Failed to add cast to fantasy movies" });
    }
  }

  const deleteFromFantasyMoviesCast = async (request, response, next) => {
    try {
      // Input
      const accountId = request.params.id;
      const movieId = request.params.movie_id;
      const castId = request.params.cast_id;
      await validateParams(request);
      // Treatment
      const account = await accountService.deleteFromFantasyMoviesCast(accountId, movieId, castId, dependencies);
      //output
      if (account !== undefined) {
        response.status(200).json();
      } else {
        response.status(404).json({ message: `account with id: ${accountId} not found` });
      }
    } catch (err) {
      response.status(500).json({ message: "Failed to delete cast from fantasy movies" });
    }
  };

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
    addToFantasyMoviesCast,
    deleteFromFantasyMoviesCast,
    verify
  };
};
