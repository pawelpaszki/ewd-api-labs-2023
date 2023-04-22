import Account from "../entities/Account";

export default {
  authenticate: async (email, password, { accountsRepository, authenticator, tokenManager }) => {
    const account = await accountsRepository.getByEmail(email);
    const result = await authenticator.compare(password, account.password);
    if (!result) {
      throw new Error('Bad credentials');
    }
    const token = tokenManager.generate({ email: account.email });
    return token;
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
  getFavouriteMovies: async (accountId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    return account.favouriteMovies;
  },
  addFavouriteMovie: async (accountId, movieId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    if (!account.favouriteMovies.includes(movieId)) {
      account.favouriteMovies.push(movieId);
    }
    return await accountsRepository.merge(account);
  },
  deleteFavouriteMovie: async (accountId, movieId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    if (account.favouriteMovies.includes(movieId)) {
      for (var i = account.favouriteMovies.length; i--;) {
        if (account.favouriteMovies[i].toString() === movieId) {
          account.favouriteMovies.splice(i, 1);
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
