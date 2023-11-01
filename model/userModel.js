const mongoose = require('mongoose')

const user = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'vendor'],
        default: 'admin'
    }
})

module.exports = mongoose.model('user', user)