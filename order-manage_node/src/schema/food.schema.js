const Joi = require('joi')

const foodSchema = Joi.object({
  foodname: Joi.string().min(2).max(15),
  foodPrice: Joi.number().required().min(0).max(1000)
  // foodPrice: Joi.string().pattern(/^(([1-9](\d{1,2})?(\.[59])?)|(0\.[59]))$/)
})

module.exports = {
  foodSchema
}
