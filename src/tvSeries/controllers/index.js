import tvSeriesService from "./../services";
import { validateParams } from "../../utils/paramsValidator";

export default (dependencies) => {

  const getTvSeries = async (request, response, next) => {
    //input
    const movieId = request.params.resource_id;
    validateParams(request);
    // Treatment
    const tvSeries = await tvSeriesService.getTvSeries(movieId, dependencies);
    //output
    response.status(200).json(tvSeries);
  };
  const find = async (request, response, next) => {
    //input
    const query = request.url.substr(request.url.indexOf('?')+1);
    // Treatment
    const tvSeries = await tvSeriesService.find(query, dependencies);
    //output
    response.status(200).json(tvSeries);
  };

  const findSimilar = async (request, response, next) => {
    //input
    const movieId = request.params.resource_id;
    validateParams(request);
    const query = request.url.substr(request.url.indexOf('?')+1);
    // Treatment
    const movies = await tvSeriesService.findSimilar(movieId, query, dependencies);
    //output
    response.status(200).json(movies);
  };

  const getMovieImages = async (request, response, next) => {
    //input
    const movieId = request.params.resource_id;
    validateParams(request);
    // Treatment
    const images = await tvSeriesService.getMovieImages(movieId, dependencies);
    //output
    response.status(200).json(images);
  };

  return {
    getTvSeries,
    find,
    findSimilar,
    getMovieImages
  };
};
