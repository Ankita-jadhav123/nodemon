const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName:{type:String,required:true,unique:true},
    productPrice:{type:String,required:true},
    productUnit:{type:String,required:true},
    productDescription:{type:String,required:true}
})

module.exports = mongoose.model('Product', productSchema)