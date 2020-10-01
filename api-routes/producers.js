const express = require('express');
const router = express.Router();
const producersController = require('../controllers/producersController');

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

module.exports = router;