const express = require('express');
const { createProduct, updateProduct, deleteProduct } = require('../controller/productController');
const authController = require('../controller/authController')
const router = express.Router();

router.post('/createProduct',authController.protect,authController.restrictTo('admin', 'vendor'), createProduct);
router.patch('/:productId',authController.protect, authController.restrictTo('admin', 'vendor'), updateProduct)
router.delete('/:productId',authController.protect, authController.restrictTo('admin', 'vendor'), deleteProduct)

module.exports = router