const Joi = require('joi')

const storeSchema = Joi.object({
  storename: Joi.string().required().min(2).max(12).trim(),
  storelocal: Joi.string().required().min(2).max(50).trim(),
  storephone: Joi.string()
    .required()
    .pattern(/^(?:(?:\+|00)86)?1[3-9]\d{9}$/),
  storeintro: Joi.string().required().min(2).max(50).trim()
})

module.exports = {
  storeSchema
}
