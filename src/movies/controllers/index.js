import moviesService from "./../services";
import { validateParams } from "../../utils/paramsValidator";
import { processAndPersistLogs } from "../../utils/logProcessor";

export default (dependencies) => {

  const getMovie = async (request, response, next) => {
    //input
    const movieId = request.params.resource_id;
    try {
      validateParams(request);
      // Treatment
      const movie = await moviesService.getMovie(movieId, dependencies);
      //output
      processAndPersistLogs("info", request, 200, "");
      response.status(200).json(movie);
    } catch (error) {
      next(error);
    }
  };
  const find = async (request, response, next) => {
    try {
      //input
      const query = request.url.substr(request.url.indexOf('?') + 1);
      // Treatment
      const movies = await moviesService.find(query, dependencies);
      //output
      processAndPersistLogs("info", request, 200, "");
      response.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  };

  const findSimilar = async (request, response, next) => {
    //input
    const movieId = request.params.resource_id;
    try {
      validateParams(request);
      const query = request.url.substr(request.url.indexOf('?') + 1);
      // Treatment
      const movies = await moviesService.findSimilar(movieId, query, dependencies);
      //output
      processAndPersistLogs("info", request, 200, "");
      response.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  };

  const getUpcomingMovies = async (request, response, next) => {
    try {
      //input
      const query = request.url.substr(request.url.indexOf('?') + 1);
      // Treatment
      const movies = await moviesService.findUpcoming(query, dependencies);
      //output
      processAndPersistLogs("info", request, 200, "");
      response.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  };

  const getMovieImages = async (request, response, next) => {
    //input
    const movieId = request.params.resource_id;
    try {
      // validateParams(request);
      // Treatment
      const images = await moviesService.getMovieImages(movieId, dependencies);
      //output
      processAndPersistLogs("info", request, 200, "");
      response.status(200).json(images);
    } catch (error) {
      next(error);
    }
  };

  const getMovieReviews = async (request, response, next) => {
    //input
    const movieId = request.params.resource_id;
    try {
      validateParams(request);
      // Treatment
      const images = await moviesService.getMovieReviews(movieId, dependencies);
      //output
      processAndPersistLogs("info", request, 200, "");
      response.status(200).json(images);
    } catch (error) {
      next(error);
    }
  };

  return {
    getMovie,
    find,
    getUpcomingMovies,
    findSimilar,
    getMovieImages,
    getMovieReviews
  };
};
