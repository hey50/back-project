



const mongoose = require('mongoose'); 


var userSchema = new mongoose.Schema({
    username: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        // required: true,
        // required: true,
        // unique: true,
    },
    password: {
        type: String,
        // required: true,
    },
    phone: {
        type: String,
        //  required: true,
    },
   
    gender:{
        type:String,
        enum:['male','female'],
       
    },
    isActive: {
        type: Boolean,
        default: true  
    },
    roles: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
});


module.exports = mongoose.model('User', userSchema);
