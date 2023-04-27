import accountService from "../services";
import { validateParams } from "../../utils/paramsValidator";
import { processAndPersistLogs } from "../../utils/logProcessor";

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
      processAndPersistLogs("error", request, 401, "");
      response.status(401).json({ error: 'Unauthorised' });
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
      processAndPersistLogs("error", request, 401, "");
      //Token Verification Failed
      response.status(401).json({ error: "Failed to verify requester identity" });
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
    } catch (e) {
      processAndPersistLogs("error", request, 500, "");
      response.status(500).json({ error: "Failed to create account" });
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
        processAndPersistLogs("info", request, 200, accountId);
        response.status(200).json(account);
      } else {
        //output
        processAndPersistLogs("error", request, 404, "");
        response.status(404).json({ error: `account with id: ${accountId} not found` });
      }
    } catch (error) {
      processAndPersistLogs("error", request, 500, "");
      response.status(500).json({ error: "Failed to get an account" });
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
      processAndPersistLogs("error", request, 500, "");
      response.status(500).json({ error: "Failed to list accounts" });
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
        processAndPersistLogs("info", request, 200, accountId);
        response.status(200).json(persistedAccount);
      } else {
        processAndPersistLogs("error", request, 404, "");
        response.status(404).json({ error: `account with id: ${accountId} not found` });
      }
    } catch (error) {
      processAndPersistLogs("error", request, 500, "");
      response.status(500).json({ error: "Failed to update accounts" });
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
        processAndPersistLogs("info", request, 200, accountId);
        response.status(200).json(account);
      } else {
        processAndPersistLogs("error", request, 404, accountId);
        response.status(404).json({ error: `account with id: ${accountId} not found` });
      }
    } catch (err) {
      processAndPersistLogs("error", request, 500, request.params.id);
      response.status(500).json({ error: "Failed to add to favourite collection" });
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
        processAndPersistLogs("info", request, 200, accountId);
        response.status(200).json(favouriteCollection);
      } else {
        processAndPersistLogs("error", request, 404, accountId);
        response.status(404).json({ error: `account with id: ${accountId} not found` });
      }
    } catch (err) {
      processAndPersistLogs("error", request, 500, request.params.id);
      response.status(500).json({ error: "Failed to get favourite collection" });
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
        processAndPersistLogs("info", request, 200, accountId);
        response.status(200).json();
      } else {
        processAndPersistLogs("error", request, 404, accountId);
        response.status(404).json({ error: `account with id: ${accountId} not found` });
      }
    } catch (err) {
      processAndPersistLogs("error", request, 500, request.params.id);
      response.status(500).json({ error: "Failed to delete from favourite collection" });
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
        processAndPersistLogs("info", request, 201, accountId);
        response.status(201).json(account);
      } else {
        processAndPersistLogs("error", request, 404, accountId);
        response.status(404).json({ error: `account with id: ${accountId} not found` });
      }
    } catch (err) {
      processAndPersistLogs("error", request, 500, request.params.id);
      response.status(500).json({ error: "Failed to add to fantasy movies" });
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
        processAndPersistLogs("info", request, 200, accountId);
        response.status(200).json(fantasyMovies);
      } else {
        processAndPersistLogs("error", request, 404, accountId);
        response.status(404).json({ error: `account with id: ${accountId} not found` });
      }
    } catch (err) {
      processAndPersistLogs("error", request, 500, request.params.id);
      response.status(500).json({ error: "Failed to get fantasy movies" });
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
          processAndPersistLogs("info", request, 200, accountId);
          response.status(200).json(movie);
        } else {
          processAndPersistLogs("error", request, 404, accountId);
          response.status(404).json({ error: `movie with id: ${movieId} not found` });
        }
      } else {
        processAndPersistLogs("error", request, 404, accountId);
        response.status(404).json({ error: `account with id: ${accountId} not found` });
      }
    } catch (err) {
      processAndPersistLogs("error", request, 500, request.params.id);
      response.status(500).json({ error: "Failed to get fantasy movie" });
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
        processAndPersistLogs("info", request, 200, accountId);
        response.status(200).json();
      } else {
        processAndPersistLogs("error", request, 404, accountId);
        response.status(404).json({ error: `account with id: ${accountId} not found` });
      }
    } catch (err) {
      processAndPersistLogs("error", request, 500, request.params.id);
      response.status(500).json({ error: "Failed to delete from fantasy movies" });
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
        processAndPersistLogs("info", request, 200, accountId);
        response.status(201).json(account);
      } else {
        processAndPersistLogs("error", request, 404, accountId);
        response.status(404).json({ error: `account with id: ${accountId} not found` });
      }
    } catch (err) {
      processAndPersistLogs("error", request, 500, request.params.id);
      response.status(500).json({ error: "Failed to add cast to fantasy movies" });
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
        processAndPersistLogs("info", request, 200, accountId);
        response.status(200).json();
      } else {
        processAndPersistLogs("error", request, 404, accountId);
        response.status(404).json({ error: `account with id: ${accountId} not found` });
      }
    } catch (err) {
      processAndPersistLogs("error", request, 500, request.params.id);
      response.status(500).json({ error: "Failed to delete cast from fantasy movies" });
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
