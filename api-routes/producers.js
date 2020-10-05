const express = require('express');
const router = express.Router();
const producersController = require('../controllers/producersController');
const productsController = require('../controllers/productsController');
const ordersController = require('../controllers/ordersController');

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

// Produits
router.get('/:id/products', productsController.getProducts);
router.get('/:id/products/:productId', productsController.getOneProduct);
router.post('/:id/products', productsController.addProduct);
router.put('/:id/products/:productId', productsController.updateProduct);
router.delete('/:id/products/:productId', productsController.removeProduct);

//Commandes
router.get('/:id/orders',ordersController.getByProducer);

module.exports = router;