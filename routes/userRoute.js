// userRoute.js
const express = require('express');
const router = express.Router();

module.exports = () => {
  const userController = require('../controllers/userController');

  router.post('/add', userController.addUser);
  router.get('/get', userController.getUser);

  return router;
};
