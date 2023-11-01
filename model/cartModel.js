const mongoose = require('mongoose')

const cart = new mongoose.Schema({
    name: {
        type:String
    },
    product_id : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        require:true
    },
    userID: {
        type:String,
        require:true
    }
})

module.exports = mongoose.model('cart', cart)