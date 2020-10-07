const express = require('express');
const router = express.Router();

const producersController = require('../controllers/producersController');
const productsController = require('../controllers/productsController');
const ordersController = require('../controllers/ordersController');
const miseVenteController = require('../controllers/miseVenteController');

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
router.get('/:id/miseVentes', miseVenteController.getByProducer);
router.post('/:id/miseVentes/:productId', miseVenteController.addProduct);//id semaine dans le query : ?semaine=...
router.delete('/:id/miseVentes/:productId', miseVenteController.remove);

module.exports = router;