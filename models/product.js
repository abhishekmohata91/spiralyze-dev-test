const mongoose = require('mongoose');

const APIError = require('../utils/APIError');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name            : { type: String, required: true, trim: true },
  price           : { type: Number, required: true },
  isDeleted       : { type: Boolean, default: false },
},
{
  timestamps: true,
});

ProductSchema.pre(/^save$/, true, async function (next, done) {
  try{
    const self = this;
    const record = await mongoose.models['product'].findOne({ _id: { $ne: self._id }, name: new RegExp(self.name,'i'), isDeleted: false });
    record ? done(new APIError({status: 409, message: `"product" whith "${self.name}" already exists`})) : done();
    next();
  }
  catch (err) { done(err); next(); }
});

/**
*  Static method isExists
*/
ProductSchema.statics.isExists = async function (_query) {
  _query.isDeleted = false;
  let count = await this.countDocuments(_query);
  return count == 1 ? true : false;
}

module.exports = mongoose.model('product', ProductSchema, 'products');
