const express = require('express');
const addToCart = require('../controller/cartController');
const authController = require('../controller/authController');
const router = express.Router();

router.post('/addToCart',addToCart)

module.exports = router;