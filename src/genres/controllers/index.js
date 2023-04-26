import genreService from "../services";
import { validateParams } from "../../utils/paramsValidator";
import { processAndPersistLogs } from "../../utils/logProcessor";

export default (dependencies) => {

  const getGenre = async (request, response, next) => {
    try {
      //input
      const id = request.params.genre_id;
      validateParams(request);
      // Treatment
      const genre = await genreService.getGenre(id, dependencies);
      //output
      if (genre !== undefined) {
        processAndPersistLogs("info", request, 200, "");
        response.status(200).json(genre);
      } else {
        processAndPersistLogs("error", request, 404, "");
        response.status(404).json({});
      }
    } catch (err) {
      processAndPersistLogs("error", request, 500, "");
      response.status(500).json({ message: "Failed to get genre" });
    }
  };
  const listGenres = async (request, response, next) => {
    try {
      // Treatment
      const genres = await genreService.find(dependencies);
      //output
      processAndPersistLogs("info", request, 200, "");
      response.status(200).json(genres);
    } catch (err) {
      processAndPersistLogs("error", request, 500, "");
      response.status(500).json({ message: "Failed to list genres" });
    }
  };

  return {
    getGenre,
    listGenres,
  };
};
