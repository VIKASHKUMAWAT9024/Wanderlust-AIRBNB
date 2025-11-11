const { required } = require("joi");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");


const userSchema=new Schema({
    email:{
        type:String,
        required:true,
    }
});
userSchema.plugin(passportLocalMongoose);//adds username,password fields and some methods to userSchema

module.exports=mongoose.model("User",userSchema);
