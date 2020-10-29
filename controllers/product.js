const { removeFields } = require('../utils/helper');

const PRODUCT = require('../models/product');

exports.all = async (req, res, next) => {
  try {
    const products = await PRODUCT.find({isDeleted: false}, '-__v -isDeleted -createdAt -updatedAt');
    return res.sendJson(200, products);
  } catch (error) { next(error); }
}

exports.show = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const product = await PRODUCT.findOne({_id, isDeleted: false});
    return res.sendJson(200, removeFields(product.toObject()));
  } catch (error) { next(error); }
}

exports.store = async (req, res, next) => {
  try {
    const payload = req.body;
    const product = await PRODUCT.create(payload);
    return res.sendJson(200, removeFields(product.toObject()));
  } catch (error) { next(error); }
}

exports.update = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const payload = req.body;
    const product = await PRODUCT.findOneAndUpdate({_id, isDeleted: false}, {$set: payload}, {new: true});
    return res.sendJson(200, removeFields(product.toObject()));
  } catch (error) { next(error); }
}

exports.destroy = async (req, res, next) => {
  try {
    const _id = req.params.id;
    await PRODUCT.findOneAndUpdate({_id, isDeleted: false}, {$set: {isDeleted: true}});
    return res.sendJson(200, "Product deleted successfully");
  } catch (error) { next(error); }
}