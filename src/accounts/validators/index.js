//* validators/register.validator.js
import Joi from 'joi';

const accountSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().regex(/^.*(?=.{7,20})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_0-9]).*$/),
  firstName: Joi.string().min(1).max(30).required(),
  lastName: Joi.string().min(1).max(30).required()
});

export default { account: accountSchema };