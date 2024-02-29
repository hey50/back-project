const mongoose = require('mongoose'); 


var catergorySchema = new mongoose.Schema({
   title:{
    type:String,
    required: [true,"category title is required"]
   },
   imageUrl:{
    type:String
   }
});


module.exports = mongoose.model('Category', catergorySchema);