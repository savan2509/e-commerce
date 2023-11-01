const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Product = require('../model/productModel');
const User = require('../controller/authController')

const createProduct = catchAsync(async(req, res,) => {
    const userID = req.User.id;
    const value ={name:req.body.name, userID }
      const newProduct = await Product.create(value);
      res.status(201).json({
          status: 'success',
          userID,
          data: newProduct
        });
  });

const updateProduct = catchAsync(async(req, res, next) => {
    const productId = req.params.productId
    if(!productId) {
        return next (new AppError ('please provide valid productId'))
    }
    const updateProduct = await Product.findByIdAndUpdate(productId, req.body, ({new:true}))
    res.status(200).json({
        status:"success",
        data:updateProduct
    })
})

const deleteProduct = catchAsync(async(req, res, next) => {
    await Product.findByIdAndDelete(req.params.productId);
    res.status(200).json({
        status:"success"
    })
})


module.exports = {createProduct,updateProduct,deleteProduct}