import Account from '../entities/Account';
import mongoose from 'mongoose';
import AccountRepository from './Repository';

export default class extends AccountRepository {

  constructor() {
    super();
    const fantasyMovieCastSchema = new mongoose.Schema({
      name: String,
      roleName: String,
      description: String,
      // avatar
    });
    const fantasyMovieSchema = new mongoose.Schema({
      title: String,
      overview: String,
      runtime: Number,
      // moviePoster
      productionCompanies: [String],
      genres: [String],
      releaseDate: String,
      cast: [fantasyMovieCastSchema]
    });
    const accountsSchema = new mongoose.Schema({
      firstName: String,
      lastName: String,
      email: { type: String, unique: true, index: true },
      password: String,
      favouriteMovies: [Number],
      favouriteTvSeries: [Number],
      favouriteActors: [Number],
      fantasyMovies: [fantasyMovieSchema]
    });
    this.model = mongoose.model('Account', accountsSchema);
  }

  async persist(accountEntity) {
    const { firstName, lastName, email, password } = accountEntity;
    const result = new this.model({ firstName, lastName, email, password });
    await result.save();
    accountEntity.id = result.id;
    return accountEntity;
  }

  async merge(accountEntity) {
    const { id, firstName, lastName, email, password, favouriteMovies, favouriteTvSeries, favouriteActors, fantasyMovies } = accountEntity;
    await this.model.findByIdAndUpdate(id, { firstName, lastName, email, password, favouriteMovies, favouriteTvSeries, favouriteActors, fantasyMovies });
    return accountEntity;
  }

  async remove(userId) {
    return this.model.findOneAndDelete(userId);
  }

  async get(userId) {
    const result = await this.model.findById(userId);
    if (result !== null) {
      const { id, firstName, lastName, email, password, favouriteMovies, favouriteTvSeries, favouriteActors, fantasyMovies } = result;
      return new Account(id, firstName, lastName, email, password, favouriteMovies, favouriteTvSeries, favouriteActors, fantasyMovies);
    } else {
      return undefined;
    }
  }

  async getByEmail(userEmail) {
    const result = await this.model.findOne({ email: userEmail });
    console.log(result);
    return new Account(result.id, result.firstName, result.lastName, result.email, result.password, result.favouriteMovies, result.favouriteTvSeries, result.favouriteActors, result.fantasyMovies);
  }

  async find() {
    const accounts = await this.model.find();
    return accounts.map((result) => {
      return new Account(result.id, result.firstName, result.lastName, result.email, result.password, result.favouriteMovies, result.favouriteTvSeries, result.favouriteActors, result.fantasyMovies);
    });
  }
}
