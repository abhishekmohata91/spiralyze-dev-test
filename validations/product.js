const Joi = require('joi');

const APIError = require('../utils/APIError');
const JoiObjectId = require('../utils/joi-objectid')(Joi);

const PRODUCT = require('../models/product');

exports.show = {
  params: Joi.object({
    id : JoiObjectId().required(),
  })
};

exports.create = {
  body: Joi.object({
    name    : Joi.string().required().trim().replace(/\s\s+/g, ' '),
    price   : Joi.number().required(),
  })
}

exports.update = {
  params: Joi.object({
    id : JoiObjectId().required(),
  }),
  body: Joi.object({
    name    : Joi.string().optional().trim().replace(/\s\s+/g, ' '),
    price   : Joi.string().optional().trim(),
  }).required().not({})
}

exports.destroy = {
  params: Joi.object({
    id : JoiObjectId().required(),
  })
};

exports.isExists = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const count = await PRODUCT.countDocuments({_id, isDeleted: false});
    if(count === 0) throw new APIError({status: 404, message: `No record were found for given id`});
    next();
  }
  catch(err) {next( err);}
}