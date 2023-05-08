import tvSeriesService from "./../services";
import { validateParams } from "../../utils/paramsValidator";
import { processAndPersistLogs } from "../../utils/logProcessor";

export default (dependencies) => {

  const getTvSeries = async (request, response, next) => {
    //input
    const movieId = request.params.resource_id;
    try {
      validateParams(request, next);
      // Treatment
      const tvSeries = await tvSeriesService.getTvSeries(movieId, dependencies);
      //output
      processAndPersistLogs("info", request, 200, "");
      response.status(200).json(tvSeries);
    } catch (error) {
      next(error);
    }
  };
  const find = async (request, response, next) => {
    try {
      //input
      const query = request.url.substr(request.url.indexOf('?') + 1);
      // Treatment
      const tvSeries = await tvSeriesService.find(query, dependencies);
      //output
      processAndPersistLogs("info", request, 200, "");
      response.status(200).json(tvSeries);
    } catch (error) {
      next(error);
    }
  };

  const findRecommended = async (request, response, next) => {
    try {
      //input
      const { favouriteMovies } = request.body;
      // Treatment
      const movies = await tvSeriesService.findRecommended(favouriteMovies, dependencies);
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
      //input
      const movieId = request.params.resource_id;
      validateParams(request, next);
      const query = request.url.substr(request.url.indexOf('?') + 1);
      // Treatment
      const movies = await tvSeriesService.findSimilar(movieId, query, dependencies);
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
      validateParams(request, next);
      // Treatment
      const images = await tvSeriesService.getMovieImages(movieId, dependencies);
      //output
      processAndPersistLogs("info", request, 200, "");
      response.status(200).json(images);
    } catch (error) {
      next(error);
    }
  };

  return {
    getTvSeries,
    find,
    findSimilar,
    findRecommended,
    getMovieImages
  };
};
