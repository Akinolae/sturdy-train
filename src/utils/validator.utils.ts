import Joi from 'joi'

const regSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  surName: Joi.string().trim().required(),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: ['com'] } })
    .required(),
  phoneNumber: Joi.string().trim().required(),
  location: Joi.string().trim().required(),
  password: Joi.string().min(8).max(16).trim().required(),
})

const login = Joi.object({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: ['com'] } })
    .required(),
  userPassword: Joi.string().min(8).max(16).trim().required(),
})

export default { regSchema, login }
