const Joi = require('joi')

const storeSchema = Joi.object({
  storename: Joi.string().min(2).max(12),
  storelocal: Joi.string().min(2).max(50),
  storephone: Joi.string().pattern(/^(?:(?:\+|00)86)?1[3-9]\d{9}$/),
  storeintro: Joi.string().min(2).max(50)
})

module.exports = {
  storeSchema
}
