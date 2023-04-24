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
    })
    return await accountsRepository.merge(account);
  },
  getFantasyMovies: async (accountId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    return account.fantasyMovies;
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
