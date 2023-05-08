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
