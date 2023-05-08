import accountService from "../services";
import { validateParams } from "../../utils/paramsValidator";
import { processAndPersistLogs } from "../../utils/logProcessor";
const CustomError = require('../..//utils/errors/custom-error');

export default (dependencies) => {

  const favouriteMoviesCollection = "favouriteMovies";
  const favouriteTvSeriesCollection = "favouriteTvSeries";
  const favouriteActorsCollection = "favouriteActors";

  const authenticateAccount = async (request, response, next) => {
    try {
      const { email, password } = request.body;
      const { token, accountId } = await accountService.authenticate(email, password, dependencies);
      processAndPersistLogs("info", request, 200, accountId);
      response.status(200).json({ token: `BEARER ${token}`, accountId: accountId });
    } catch (error) {
      next(error);
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
    } catch (error) {
      next(error);
    }
  };
  const createAccount = async (request, response, next) => {
    try {
      // Input
      const { firstName, lastName, email, password } = request.body;
      // Treatment
      const account = await accountService.registerAccount(firstName, lastName, email, password, dependencies);
      //output
      processAndPersistLogs("info", request, 201, "");
      response.status(201).json(account);
    } catch (error) {
      next(error);
    }
  };
  const getAccount = async (request, response, next) => {
    try {
      //input
      const accountId = request.params.id;
      await validateParams(request, next);
      // Treatment
      const account = await accountService.getAccount(accountId, dependencies);
      processAndPersistLogs("info", request, 200, accountId);
      response.status(200).json(account);
    } catch (error) {
      next(error);
    }
  };
  const listAccounts = async (request, response, next) => {
    try {
      // Treatment
      const accounts = await accountService.find(dependencies);
      //output
      processAndPersistLogs("info", request, 200, "");
      response.status(200).json(accounts);
    } catch (error) {
      next(error);
    }
  };
  const updateAccount = async (request, response, next) => {
    try {
      // Input
      const accountId = request.params.id;
      await validateParams(request, next);
      const { firstName, lastName, email, password } = request.body;
      // Treatment
      const account = await accountService.getAccount(id, dependencies);
      const persistedAccount = await accountService.updateAccount(account.id, firstName, lastName, email, password, dependencies);
      processAndPersistLogs("info", request, 200, accountId);
      response.status(200).json(persistedAccount);
    } catch (error) {
      next(error);
    }
  };
  const addToFavouriteCollection = async (request, response, next) => {
    try {
      let account = undefined;
      const accountId = request.params.id;
      await validateParams(request, next);
      const url = request.url.toString();
      const { id } = request.body;
      if (url.includes("movies")) {
        account = await accountService.addToFavouriteCollection(accountId, id, favouriteMoviesCollection, dependencies);
      } else if (url.includes("tv")) {
        account = await accountService.addToFavouriteCollection(accountId, id, favouriteTvSeriesCollection, dependencies);
      } else if (url.includes("actors")) {
        account = await accountService.addToFavouriteCollection(accountId, id, favouriteActorsCollection, dependencies);
      }
      processAndPersistLogs("info", request, 200, accountId);
      response.status(200).json(account);
    } catch (error) {
      next(error);
    }
  };
  const getFavouriteCollection = async (request, response, next) => {
    try {
      let favouriteCollection = undefined;
      const url = request.url.toString();
      const accountId = request.params.id;
      await validateParams(request, next);
      if (url.includes("movies")) {
        favouriteCollection = await accountService.getFavouriteCollection(accountId, favouriteMoviesCollection, dependencies);
      } else if (url.includes("tv")) {
        favouriteCollection = await accountService.getFavouriteCollection(accountId, favouriteTvSeriesCollection, dependencies);
      } else if (url.includes("actors")) {
        favouriteCollection = await accountService.getFavouriteCollection(accountId, favouriteActorsCollection, dependencies);
      }
      processAndPersistLogs("info", request, 200, accountId);
      response.status(200).json(favouriteCollection);
    } catch (error) {
      next(error);
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
      }
      processAndPersistLogs("info", request, 200, accountId);
      response.status(200).json();
    } catch (error) {
      next(error);
    }
  };
  const addToFantasyMovies = async (request, response, next) => {
    try {
      // Input
      const accountId = request.params.id;
      await validateParams(request, next);
      const { title, overview, runtime, moviePoster, productionCompanies, genres, releaseDate } = request.body;
      // Treatment
      const account = await accountService.addToFantasyMovies(accountId, title, overview, runtime, moviePoster, productionCompanies, genres, releaseDate, dependencies);
      //output
      processAndPersistLogs("info", request, 201, accountId);
      response.status(201).json(account);
    } catch (error) {
      next(error);
    }
  };
  const getFantasyMovies = async (request, response, next) => {
    try {
      // Input
      const accountId = request.params.id;
      await validateParams(request, next);
      // Treatment
      const fantasyMovies = await accountService.getFantasyMovies(accountId, dependencies);
      //output
      processAndPersistLogs("info", request, 200, accountId);
      response.status(200).json(fantasyMovies);
    } catch (error) {
      next(error);
    }
  };
  const getFantasyMovie = async (request, response, next) => {
    try {
      // Input
      const movieId = request.params.movie_id;
      const accountId = request.params.id;
      await validateParams(request, next);
      // Treatment
      const { account, movie } = await accountService.getFantasyMovie(accountId, movieId, dependencies);
      //output
      processAndPersistLogs("info", request, 200, accountId);
      response.status(200).json(movie);
    } catch (error) {
      next(error);
    }
  };
  const deleteFromFantasyMovies = async (request, response, next) => {
    try {
      // Input
      const accountId = request.params.id;
      const movieId = request.params.movie_id;
      await validateParams(request, next);
      // Treatment
      const account = await accountService.deleteFromFantasyMovies(accountId, movieId, dependencies);
      //output
      processAndPersistLogs("info", request, 200, accountId);
      response.status(200).json();
    } catch (error) {
      next(error);
    }
  };

  const addToFantasyMoviesCast = async (request, response, next) => {
    try {
      // Input
      const accountId = request.params.id;
      const movieId = request.params.movie_id;
      await validateParams(request, next);
      const { name, roleName, description } = request.body;
      // Treatment
      const account = await accountService.addToFantasyMoviesCast(accountId, movieId, name, roleName, description, dependencies);
      //output
      processAndPersistLogs("info", request, 200, accountId);
      response.status(201).json(account);
    } catch (error) {
      next(error);
    }
  }

  const deleteFromFantasyMoviesCast = async (request, response, next) => {
    try {
      // Input
      const accountId = request.params.id;
      const movieId = request.params.movie_id;
      const castId = request.params.cast_id;
      await validateParams(request, next);
      // Treatment
      const account = await accountService.deleteFromFantasyMoviesCast(accountId, movieId, castId, dependencies);
      //output
      processAndPersistLogs("info", request, 200, accountId);
      response.status(200).json();
    } catch (error) {
      next(error);
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
