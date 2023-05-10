import axios from 'axios';
import CustomError from '../../utils/errors/custom-error.js';

export default {
  getActor: async (actorId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${actorId}?api_key=${process.env.TMDB_KEY}`
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
      `https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&${query}`
    );
    return response.data;
  },
  search: async (query) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/person?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&${query}`
    );
    return response.data;
  },
  getPersonImages: async (personId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${personId}/images?api_key=${process.env.TMDB_KEY}`
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
