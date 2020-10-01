const express = require('express');
const router = express.Router();
const producersController = require('../controllers/producersController');
const productsController = require('../controllers/productsController');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', producersController.getProducers);
router.get('/:id', producersController.getProducer);
router.post('/', producersController.createProducer);
router.put('/:id', producersController.updateProducer);
router.delete('/:id',producersController.removeProducer);

router.get('/:id/products', productsController.getProducts);
router.get('/:id/products/:productId', productsController.getOneProduct);
router.delete('/:id/products/:productId', productsController.removeProduct);

module.exports = router;