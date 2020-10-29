const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('../swagger.json');
const { swageerOptions } = require('../config');

router.get('/',(req, res, next) => res.render('index.ejs'));
router.get('/flickr',(req, res, next) => res.render('flickr.ejs'));
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swageerOptions));
router.use('/product', require("./product"));

module.exports = router;
