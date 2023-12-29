const Joi = require('joi')

const loginSchema = Joi.object({
  username: Joi.string().required().min(2).max(12).alphanum(),
  password: Joi.string()
    .required()
    .min(2)
    .max(12)
    .pattern(/^(?=.*[a-zA-Z])(?=.*\d).+$/)
})

const userSchema = Joi.object({
  username: Joi.string().min(2).max(12).alphanum(),
  password: Joi.string()
    .min(2)
    .max(12)
    .pattern(/^(?=.*[a-zA-Z])(?=.*\d).+$/)
})

module.exports = {
  loginSchema,
  userSchema
}
