const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email:{
        type: String, required: true, unique: true
    },
    password:{
        type: String,
        required: true
    },
    userType:{
        type: String,
        enum:['student', 'teacher'] 
    },
    department:{
        type:String,
        enum:['MATHEMATIQUE', 'INFORMATIQUE', 'PHYSIQUE', 'CHIMIE', 'BIOLOGIE','GEOLOGIE']
       

    },
    fullName:{
        type:String
        
    },
    profileImage:{
        type:String
    },
    verificationCode: {
        type: String,
        default: null
    },
    dateCreated:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);