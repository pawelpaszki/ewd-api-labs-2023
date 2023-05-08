export default class CustomError extends Error {
  constructor(code, account_id) {
    super();
    this.code = code;
    this.account_id = account_id;
  }
}