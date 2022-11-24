const mongoose = require ('mongoose')

const users = new mongoose.Schema({


    name:{type:String,required:true, minlength:3, maxlength:200},
    email:String,
    password:String,




    //name:{type:String,required:true,minlength:3,maxlenght:30},
    //email:{type:String,required:true,minlength:3,maxlenght:200,unique:true},
    //password:{type:String,required:true,minlength:3,maxlength:1024}

})

const User = mongoose.model('User',users)

module.exports = User