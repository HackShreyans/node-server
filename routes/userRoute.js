// userRoute.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/tokenVerified');

module.exports = () => {
  const userController = require('../controllers/userController');

  router.post('/add', userController.addUser);
  router.get('/get',verifyToken, userController.getUser);
  router.post('/reset-password',verifyToken, userController.resetPassword);
  router.post('/login',userController.login);

  return router;
};
