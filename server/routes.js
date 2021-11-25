const router = require('express').Router();
const controller = require('./controllers.js');

router.get('/products', controller.getAll);
router.get('/products/:product_id', controller.getOne);
router.get('/products/:product_id/styles', controller.getProductStyles);
router.get('/cart', controller.getCart);
router.post('/cart', controller.addToCart);



module.exports = router;