const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.addUser);

module.exports = router;