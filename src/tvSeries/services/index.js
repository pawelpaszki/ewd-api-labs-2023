import axios from 'axios';
import CustomError from '../../utils/errors/custom-error';

export default {
  getTvSeries: async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${movieId}?api_key=${process.env.TMDB_KEY}`
      );
      return response.data;
    } catch (error) {
      if (error.toString().includes("404")) {
        throw new CustomError('RESOURCE_NOT_FOUND', "");
      } else {
        throw new CustomError('INTERNAL_ERROR', "");
      }
    }
  },
  find: async (query) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&${query}`
    );
    return response.data;
  },
  findRecommended: async (favouriteMovies) => {
    let recommended = [];
    try {
      for (let index = 0; index < favouriteMovies.length; index++) {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${favouriteMovies[index]}/similar?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false`
        );
        if (response.data.results.length > 5) {
          for (let j = 0; j < 5; j++) {
            recommended.push(response.data.results[j]);
          }
        }
      }
      return recommended;
    } catch (error) {
      throw new CustomError('INTERNAL_ERROR', "");
    }
  },
  findSimilar: async (movieId, query) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${movieId}/similar?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&${query}`
      );
      return response.data;
    } catch (error) {
      if (error.toString().includes("404")) {
        throw new CustomError('RESOURCE_NOT_FOUND', "");
      } else {
        throw new CustomError('INTERNAL_ERROR', "");
      }
    }
  },
  getMovieImages: async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${movieId}/images?api_key=${process.env.TMDB_KEY}`
      );
      return response.data;
    } catch (error) {
      if (error.toString().includes("404")) {
        throw new CustomError('RESOURCE_NOT_FOUND', "");
      } else {
        throw new CustomError('INTERNAL_ERROR', "");
      }
    }
  },
};
