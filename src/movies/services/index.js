import axios from 'axios';
import CustomError from '../../utils/errors/custom-error';

export default {
  getMovie: async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_KEY}`
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
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&${query}`
    );
    return response.data;
  },
  findSimilar: async (movieId, query) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&${query}`
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
  findUpcoming: async (query) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&${query}`
    );
    return response.data;
  },
  getMovieImages: async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${process.env.TMDB_KEY}`
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
  getMovieReviews: async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${process.env.TMDB_KEY}`
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
