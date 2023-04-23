import axios from 'axios';

export default {
  getActor: async (actorId) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/${actorId}?api_key=${process.env.TMDB_KEY}`
    );
    return response.data;
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

};
