const mongoose = require("mongoose"); 
const schema = new mongoose.Schema({
    name: String, 
    price: Number, 
    description: String, 
    imgUrl: String
})

const productModel = mongoose.model("product", schema)

module.exports = productModel; 