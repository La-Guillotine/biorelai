const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorieController');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', categorieController.getAll);
router.get('/:id', categorieController.getOneById);
router.post('/', categorieController.addCategorie);
router.delete('/:id',categorieController.remove);

module.exports = router;