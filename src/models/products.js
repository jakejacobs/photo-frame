const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    is_available:{
        type:Boolean,
        required:true
    },
    available_cnt:{
        type:Number,
        trim:true
    }
    
})

const Product = mongoose.model('Product',productsSchema)

module.exports = Product