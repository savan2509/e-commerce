const catchAsync = require("../utils/catchAsync")
const cart = require('../model/cartModel');

const addToCart = catchAsync(async(req, res, next) => {
    const cartAdd = await cart.create ({
        product_id:req.body.product_id,
        name:req.body.name,
        userID:req.body.userID 
    })
    res.status(200).json({
        status:"success",
        data:cartAdd
    })
})

module.exports = addToCart