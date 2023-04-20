import genreService from "../services";

export default (dependencies) => {

  const getGenre = async (request, response, next) => {
    //input
    const id = request.params.id;
    // Treatment
    const genre = await genreService.getGenre(id, dependencies);
    //output
    if (genre !== undefined) {
      response.status(200).json(genre);
    } else {
      response.status(404).json({});
    }
  };
  const listGenres = async (request, response, next) => {
    // Treatment
    const genres = await genreService.find(dependencies);
    //output
    response.status(200).json(genres);
  };
  

  return {
    getGenre,
    listGenres,
  };
};
