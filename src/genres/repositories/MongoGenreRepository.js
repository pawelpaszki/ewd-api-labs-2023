import Genre from '../entities/Genre';
import mongoose from 'mongoose';
import GenreRepository from './Repository';

export default class extends GenreRepository {

  constructor() {
    super();
    const genresSchema = new mongoose.Schema({
      tmdbID: String,
      name: String,
    });
    this.model = mongoose.model('Genre', genresSchema);
  }

  async get(tmdbID) {
    const result = await this.model.findOne({ tmdbID: tmdbID });
    if (result !== null) {
      return new Genre(result.id, result.tmdbID, result.name);
    } else {
      return undefined
    }
  }

  async find() {
    const genres = await this.model.find();
    return genres.map((result) => {
      return new Genre(result.id, result.tmdbID, result.name);
    });
  }
}
