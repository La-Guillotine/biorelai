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
// router.post('/', categorieController.addCategorie);
// router.delete('/:id',categorieController.remove);

module.exports = router;