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
    } catch (err) {
      if (err.toString().includes("404")) {
        processAndPersistLogs("error", request, 404, "");
        response.status(404).json({ error: `movie with id: '${movieId}' not found` });
      } else {
        processAndPersistLogs("error", request, 500, "");
        response.status(500).json({ error: "failed to get movie" });
      }
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
    } catch (err) {
      processAndPersistLogs("error", request, 500, "");
      response.status(500).json({ error: "failed to find movies" });
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
    } catch (err) {
      processAndPersistLogs("error", request, 500, "");
      response.status(500).json({ error: `failed to find movies similar to movie with id: '${movieId}` });
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
    } catch (err) {
      processAndPersistLogs("error", request, 500, "");
      response.status(500).json({ error: `failed to get upcoming movies` });
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
    } catch (err) {
      if (err.toString().includes("404")) {
        processAndPersistLogs("error", request, 404, "");
        response.status(404).json({ error: `movie with id: '${movieId}' not found` });
      } else {
        processAndPersistLogs("error", request, 500, "");
        response.status(500).json({ error: "failed to get movie images" });
      }
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
    } catch (err) {
      if (err.toString().includes("404")) {
        processAndPersistLogs("error", request, 404, "");
        response.status(404).json({ error: `movie with id: '${movieId}' not found` });
      } else {
        processAndPersistLogs("error", request, 500, "");
        response.status(500).json({ error: "failed to get movie reviews" });
      }
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
