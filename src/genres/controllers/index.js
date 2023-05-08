import genreService from "../services";
import { validateParams } from "../../utils/paramsValidator";
import { processAndPersistLogs } from "../../utils/logProcessor";

export default (dependencies) => {

  const getGenre = async (request, response, next) => {
    try {
      //input
      const id = request.params.genre_id;
      validateParams(request, next);
      // Treatment
      const genre = await genreService.getGenre(id, dependencies);
      //output
      processAndPersistLogs("info", request, 200, "");
      response.status(200).json(genre);
    } catch (error) {
      next(error);
    }
  };
  const listGenres = async (request, response, next) => {
    try {
      // Treatment
      const genres = await genreService.find(dependencies);
      //output
      processAndPersistLogs("info", request, 200, "");
      response.status(200).json(genres);
    } catch (error) {
      next(error);
    }
  };

  return {
    getGenre,
    listGenres,
  };
};
