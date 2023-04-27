import tvSeriesService from "./../services";
import { validateParams } from "../../utils/paramsValidator";
import { processAndPersistLogs } from "../../utils/logProcessor";

export default (dependencies) => {

  const getTvSeries = async (request, response, next) => {
    //input
    const movieId = request.params.resource_id;
    try {
      validateParams(request);
      // Treatment
      const tvSeries = await tvSeriesService.getTvSeries(movieId, dependencies);
      //output
      processAndPersistLogs("info", request, 200, "");
      response.status(200).json(tvSeries);
    } catch (err) {
      if (err.toString().includes("404")) {
        processAndPersistLogs("error", request, 404, "");
        response.status(404).json({ error: `tv series with id: '${movieId}' not found` });
      } else {
        processAndPersistLogs("error", request, 500, "");
        response.status(500).json({ error: "failed to get tv series" });
      }
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
    } catch (err) {
      processAndPersistLogs("error", request, 500, "");
      response.status(500).json({ error: "failed to find tv series" });
    }
  };

  const findSimilar = async (request, response, next) => {
    //input
    const movieId = request.params.resource_id;
    try {
      //input
      const movieId = request.params.resource_id;
      validateParams(request);
      const query = request.url.substr(request.url.indexOf('?') + 1);
      // Treatment
      const movies = await tvSeriesService.findSimilar(movieId, query, dependencies);
      //output
      processAndPersistLogs("info", request, 200, "");
      response.status(200).json(movies);
    } catch (err) {
      processAndPersistLogs("error", request, 500, "");
      response.status(500).json({ error: `failed to find tv series similar to movie with id: '${movieId}` });
    }
  };

  const getMovieImages = async (request, response, next) => {
    //input
    const movieId = request.params.resource_id;
    try {
      validateParams(request);
      // Treatment
      const images = await tvSeriesService.getMovieImages(movieId, dependencies);
      //output
      processAndPersistLogs("info", request, 200, "");
      response.status(200).json(images);
    } catch (err) {
      if (err.toString().includes("404")) {
        processAndPersistLogs("error", request, 404, "");
        response.status(404).json({ error: `tv series with id: '${movieId}' not found` });
      } else {
        processAndPersistLogs("error", request, 500, "");
        response.status(500).json({ error: "failed to get tv series images" });
      }
    }
  };

  return {
    getTvSeries,
    find,
    findSimilar,
    getMovieImages
  };
};
