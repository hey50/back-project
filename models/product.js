const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
   title: {
      type: String,
      required: [true, "Product title is required"]
   },
   description: {
      type: String,
      required: [true, "Product description is required"]
   },
   price: {
      type: Number,
      required: [true, "Product price is required"]
   },
   category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, "Product category is required"]
   },
   imageUrl: {
      type: String
   }
});

const Product = mongoose.model('Product', productSchema);
module.exports=Product