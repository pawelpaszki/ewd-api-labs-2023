import genreService from "../services";
import { validateParams } from "../../utils/paramsValidator";

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
        response.status(200).json(genre);
      } else {
        response.status(404).json({});
      }
    } catch (err) {
      response.status(500).json({ message: "Failed to get genre" });
    }
  };
  const listGenres = async (request, response, next) => {
    try {
      // Treatment
      const genres = await genreService.find(dependencies);
      //output
      response.status(200).json(genres);
    } catch (err) {
      response.status(500).json({ message: "Failed to list genres" });
    }
  };

  return {
    getGenre,
    listGenres,
  };
};
