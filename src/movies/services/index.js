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
  findRecommended: async (favouriteMovies) => {
    let recommended = [];
    try {
      for (let index = 0; index < favouriteMovies.length; index++) {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${favouriteMovies[index]}/similar?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false`
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
