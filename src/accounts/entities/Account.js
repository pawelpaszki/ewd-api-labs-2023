export default class {
  constructor(
    id = undefined,
    firstName,
    lastName,
    email,
    password,
    favouriteMovies = [],
    favouriteTvSeries = [],
    favouriteActors = []) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this.favouriteMovies = favouriteMovies;
      this.favouriteTvSeries = favouriteTvSeries;
      this.favouriteActors = favouriteActors;
  }
}
