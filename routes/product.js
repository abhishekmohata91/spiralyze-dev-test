const router = require('express').Router();
const { validate } = require('express-validation');

const { show, create, update, destroy, isExists } = require('../validations/product');

const PRODUCT = require('../controllers/product');

router.get('/', PRODUCT.all);
router.get('/:id',validate(show), isExists, PRODUCT.show);
router.post('/', validate(create), PRODUCT.store);
router.put('/:id', validate(update), isExists, PRODUCT.update);
router.delete('/:id',validate(destroy), isExists, PRODUCT.destroy);


module.exports = router;