import moviesService from "./../services";

export default (dependencies) => {

  const getMovie = async (request, response, next) => {
    //input
    const movieId = request.params.id;
    // Treatment
    const movie = await moviesService.getMovie(movieId, dependencies);
    //output
    response.status(200).json(movie);
  };
  const find = async (request, response, next) => {
    //input
    const query = request.url.substr(request.url.indexOf('?')+1);
    // Treatment
    const movies = await moviesService.find(query, dependencies);
    //output
    response.status(200).json(movies);
  };

  const findSimilar = async (request, response, next) => {
    //input
    const movieId = request.params.id;
    const query = request.url.substr(request.url.indexOf('?')+1);
    // Treatment
    const movies = await moviesService.findSimilar(movieId, query, dependencies);
    //output
    response.status(200).json(movies);
  };

  const getUpcomingMovies = async (request, response, next) => {
    //input
    const query = request.url.substr(request.url.indexOf('?')+1);
    // Treatment
    const movies = await moviesService.findUpcoming(query, dependencies);
    //output
    response.status(200).json(movies);
  };

  const getMovieImages = async (request, response, next) => {
    //input
    const movieId = request.params.id;
    console.log(movieId);
    // Treatment
    const images = await moviesService.getMovieImages(movieId, dependencies);
    //output
    response.status(200).json(images);
  };

  return {
    getMovie,
    find,
    getUpcomingMovies,
    findSimilar,
    getMovieImages
  };
};
