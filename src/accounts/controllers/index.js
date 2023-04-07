import accountService from "../services";

export default (dependencies) => {

  const authenticateAccount = async (request, response, next) => {
    try {
      const { email, password } = request.body;
      const token = await accountService.authenticate(email, password, dependencies);
      response.status(200).json({ token: `BEARER ${token}` });
    } catch (error) {
      response.status(401).json({ message: 'Unauthorised' });
    }
  };

  const createAccount = async (request, response, next) => {
    // Input
    const { firstName, lastName, email, password } = request.body;
    // Treatment
    const account = await accountService.registerAccount(firstName, lastName, email, password, dependencies);
    //output
    response.status(201).json(account)
  };
  const getAccount = async (request, response, next) => {
    //input
    const accountId = request.params.id;
    // Treatment
    const account = await accountService.getAccount(accountId, dependencies);
    //output
    response.status(200).json(account);
  };
  const listAccounts = async (request, response, next) => {
    // Treatment
    const accounts = await accountService.find(dependencies);
    //output
    response.status(200).json(accounts);
  };
  const updateAccount = async (request, response, next) => {
    // Input
    const id = request.params.id;
    const { firstName, lastName, email, password } = request.body;
    // Treatment
    const account = await accountService.getAccount(id, dependencies);
    if (account !== undefined) {
      const persistedAccount = await accountService.updateAccount(account.id, firstName, lastName, email, password, dependencies);
      response.status(200).json(persistedAccount);
    } else {
      response.status(404);
    }
  };

  return {
    authenticateAccount,
    createAccount,
    getAccount,
    listAccounts,
    updateAccount
  };
};
