import Account from "../entities/Account";
const CustomError = require('../../utils/errors/custom-error');

export default {
  authenticate: async (email, password, { accountsRepository, authenticator, tokenManager }) => {
    const account = await accountsRepository.getByEmail(email);
    const result = await authenticator.compare(password, account.password);
    if (!result) {
      throw new CustomError('UNAUTHORIZED', "");
    }
    const token = tokenManager.generate({ email: account.email });
    return { token: token, accountId: account.id };
  },
  registerAccount: async (firstName, lastName, email, password, { accountsRepository, authenticator }) => {
    password = await authenticator.encrypt(password);
    const account = new Account(undefined, firstName, lastName, email, password);
    return accountsRepository.persist(account);
  },
  getAccount: async (accountId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    if (account !== undefined) {
      return account;
    }
    throw new CustomError('ACCOUNT_NOT_FOUND', accountId);
  },
  find: ({ accountsRepository }) => {
    return accountsRepository.find();
  },
  findByEmail: (email, { accountsRepository }) => {
    return accountsRepository.getByEmail(email);
  },
  updateAccount: async (id, firstName, lastName, email, password, { accountsRepository }) => {
    password = await authenticator.encrypt(password);
    const account = new Account(id, firstName, lastName, email, password);
    return accountsRepository.merge(account);
  },
  addToFavouriteCollection: async (accountId, collectionResourceId, collectionName, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    if (account !== undefined) {
      if (!account[collectionName].includes(collectionResourceId)) {
        account[collectionName].push(collectionResourceId);
      }
      return await accountsRepository.merge(account);
    } else {
      throw new CustomError('ACCOUNT_NOT_FOUND', accountId);
    }
  },
  getFavouriteCollection: async (accountId, collectionName, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    if (account !== undefined) {
      return account[collectionName];
    } else {
      throw new CustomError('ACCOUNT_NOT_FOUND', accountId);
    }
  },
  deleteFromFavouriteCollection: async (accountId, collectionResourceId, collectionName, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    if (account !== undefined) {
      if (account[collectionName].includes(collectionResourceId)) {
        for (var i = account[collectionName].length; i--;) {
          if (account[collectionName][i].toString() === collectionResourceId) {
            account[collectionName].splice(i, 1);
          }
        }
      }
      return await accountsRepository.merge(account);
    } else {
      throw new CustomError('ACCOUNT_NOT_FOUND', accountId);
    }
  },
  addToFantasyMovies: async (accountId, title, overview, runtime, moviePoster, productionCompanies, genres, releaseDate, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    if (account !== undefined) {
      account.fantasyMovies.push({
        title: title,
        overview: overview,
        runtime: runtime,
        moviePoster: moviePoster,
        productionCompanies: productionCompanies,
        genres: genres,
        releaseDate: releaseDate
      });
      return await accountsRepository.merge(account);
    } else {
      throw new CustomError('ACCOUNT_NOT_FOUND', accountId);
    }
  },
  getFantasyMovies: async (accountId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    if (account !== undefined) {
      return account.fantasyMovies;
    } else {
      throw new CustomError('ACCOUNT_NOT_FOUND', accountId);
    }
  },
  getFantasyMovie: async (accountId, movieId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    if (account !== undefined) {
      let m = undefined;
      account.fantasyMovies.every(movie => {
        if (movie._id.toString() === movieId) {
          m = movie;
          return false; // "break"
        }
        return true // must return true if doesn't break
      });
      if (m !== undefined) {
        return { account: account, movie: m };
      } else {
        throw new CustomError('RESOURCE_NOT_FOUND', accountId);
      }
    } else {
      throw new CustomError('ACCOUNT_NOT_FOUND', accountId);
    }
  },
  deleteFromFantasyMovies: async (accountId, movieId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    if (account !== undefined) {
      for (var i = account.fantasyMovies.length; i--;) {
        if (account.fantasyMovies[i]._id.toString() === movieId) {
          account.fantasyMovies.splice(i, 1);
          break;
        }
      }
      return await accountsRepository.merge(account);
    } else {
      throw new CustomError('ACCOUNT_NOT_FOUND', accountId);
    }
  },
  addToFantasyMoviesCast: async (accountId, movieId, name, roleName, description, avatar, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    if (account !== undefined) {
      for (var i = account.fantasyMovies.length - 1; i >= 0; i--) {
        if (account.fantasyMovies[i]._id.toString() === movieId) {
          account.fantasyMovies[i].cast.push({
            name: name,
            roleName: roleName,
            description: description,
            avatar: avatar
          })
          break;
        }
      }
      return await accountsRepository.merge(account);
    } else {
      throw new CustomError('ACCOUNT_NOT_FOUND', accountId);
    }
  },
  deleteFromFantasyMoviesCast: async (accountId, movieId, castId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    if (account !== undefined) {
      for (var i = account.fantasyMovies.length; i--;) {
        if (account.fantasyMovies[i]._id.toString() === movieId) {
          for (var j = account.fantasyMovies[i].cast.length; j--;) {
            if (account.fantasyMovies[i].cast[j]._id.toString() === castId) {
              account.fantasyMovies[i].cast.splice(j, 1);
              break;
            }
          }
        }
      }
      return await accountsRepository.merge(account);
    } else {
      throw new CustomError('ACCOUNT_NOT_FOUND', accountId);
    }
  },
  verifyToken: async (token, { accountsRepository, tokenManager }) => {
    try {
      const decoded = await tokenManager.decode(token);
      const user = await accountsRepository.getByEmail(decoded.email);
      return user.email;
    } catch (error) {
      throw new CustomError("BAD_TOKEN", "");
    }
  }
};
