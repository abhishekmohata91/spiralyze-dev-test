const { secretKeys } = require('../config');

/**
 * 
 * @param {*} obj Source data object from which data needs to remove
 * @param {*} keys Keys that need to be delete
 * @param {*} defaultFields determine is default keys need to delete or not(Default: true)
 */
exports.removeFields = (obj, keys, defaultFields = true) => {
  var basicFields = ['createdAt', 'updatedAt', 'isDeleted', 'deletedBy', 'deletedAt', '__v'];
  keys = typeof keys == 'string' ? [keys] : keys || [];
  if (defaultFields) keys = keys.concat(basicFields);
  keys.forEach((key) => delete obj[key]);
  return obj;
};

