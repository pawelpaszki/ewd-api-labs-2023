import Account from '../entities/Account';
import mongoose from 'mongoose';
import AccountRepository from './Repository';

export default class extends AccountRepository {

  constructor() {
    super();
    const accountsSchema = new mongoose.Schema({
      firstName: String,
      lastName: String,
      email: { type: String, unique: true, index: true },
      password: String,
      favouriteMovies: [Number]
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
    const { id, firstName, lastName, email, password, favouriteMovies } = accountEntity;
    await this.model.findByIdAndUpdate(id, { firstName, lastName, email, password, favouriteMovies });
    return accountEntity;
  }

  async remove(userId) {
    return this.model.findOneAndDelete(userId);
  }

  async get(userId) {
    const result = await this.model.findById(userId);
    const { id, firstName, lastName, email, password, favouriteMovies } = result;
    return new Account(id, firstName, lastName, email, password, favouriteMovies);
  }

  async getByEmail(userEmail) {
    const result = await this.model.findOne({ email: userEmail });
    return new Account(result.id, result.firstName, result.lastName, result.email, result.password, result.favouriteMovies);
  }

  async find() {
    const accounts = await this.model.find();
    return accounts.map((result) => {
      return new Account(result.id, result.firstName, result.lastName, result.email, result.password, result.favouriteMovies);
    });
  }
}
