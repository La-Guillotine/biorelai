const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// router.get('/', producersController.getProducers);
// router.get('/:id', producersController.getProducer);
// router.post('/', producersController.createProducer);
// router.put('/:id', producersController.updateProducer);
// router.delete('/:id',producersController.removeProducer);

// Commandes
router.get('/:id/orders', ordersController.getByCustomer);
router.get('/:id/orders/:orderId', ordersController.getOne);

module.exports = router;