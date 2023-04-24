import Account from "../entities/Account";

export default {
  authenticate: async (email, password, { accountsRepository, authenticator, tokenManager }) => {
    const account = await accountsRepository.getByEmail(email);
    const result = await authenticator.compare(password, account.password);
    if (!result) {
      throw new Error('Bad credentials');
    }
    const token = tokenManager.generate({ email: account.email });
    return { token: token, accountId: account.id };
  },
  registerAccount: async (firstName, lastName, email, password, { accountsRepository, authenticator }) => {
    password = await authenticator.encrypt(password);
    const account = new Account(undefined, firstName, lastName, email, password);
    return accountsRepository.persist(account);
  },
  getAccount: (accountId, { accountsRepository }) => {
    return accountsRepository.get(accountId);
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
    console.log(account[collectionName]);
    console.log(collectionResourceId);
    if (!account[collectionName].includes(collectionResourceId)) {
      account[collectionName].push(collectionResourceId);
    }
    return await accountsRepository.merge(account);
  },
  getFavouriteCollection: async (accountId, collectionName, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    return account[collectionName];
  },
  deleteFromFavouriteCollection: async (accountId, collectionResourceId, collectionName, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    if (account[collectionName].includes(collectionResourceId)) {
      for (var i = account[collectionName].length; i--;) {
        if (account[collectionName][i].toString() === collectionResourceId) {
          account[collectionName].splice(i, 1);
        }
      }
    }
    return await accountsRepository.merge(account);
  },
  addToFantasyMovies: async (accountId, title, overview, runtime, productionCompanies, genres, releaseDate, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    account.fantasyMovies.push({
      title: title,
      overview: overview,
      runtime: runtime,
      productionCompanies: productionCompanies,
      genres: genres,
      releaseDate: releaseDate
    });
    return await accountsRepository.merge(account);
  },
  getFantasyMovies: async (accountId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    return account.fantasyMovies;
  },
  getFantasyMovie: async (accountId, movieId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    let m = undefined;
    account.fantasyMovies.every(movie => {
      if (movie._id.toString() === movieId) {
        m = movie;
        return false; // "break"
      }
      return true // must return true if doesn't break
    });
    return m;
  },
  deleteFromFantasyMovies: async (accountId, movieId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    for (var i = account.fantasyMovies.length; i--;) {
      if (account.fantasyMovies[i]._id.toString() === movieId) {
        account.fantasyMovies.splice(i, 1);
        break;
      }
    }
    return await accountsRepository.merge(account);
  },
  addToFantasyMoviesCast: async (accountId, movieId, name, roleName, description, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    for (var i = account.fantasyMovies.length - 1; i >= 0; i--) {
      if (account.fantasyMovies[i]._id.toString() === movieId) {
        account.fantasyMovies[i].cast.push({
          name: name,
          roleName: roleName,
          description: description
        })
        break;
      }
    }
    return await accountsRepository.merge(account);
  },
  deleteFromFantasyMoviesCast: async (accountId, movieId, castId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
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
  },
  verifyToken: async (token, { accountsRepository, tokenManager }) => {
    const decoded = await tokenManager.decode(token);
    const user = await accountsRepository.getByEmail(decoded.email);
    if (!user) {
      throw new Error('Bad token');
    }
    return user.email;
  }
};
