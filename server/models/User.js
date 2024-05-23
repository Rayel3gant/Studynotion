const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({

    FirstName:{
        type:String,
        required:true,
        trim:true
    },
    LastName:{
        type:String,
        required:true,
        trim:true
    },
    Email:{
        type:String,
        required:true,
        trim:true
    },
    Password:{
        type:String,
        required:true
    },
    ContactNo:{
        type:Number,
        required:true
    },
    AccountType:{
        type:String,
        enum:[ "Student" ,"Admin" ,"Instructor"],
        required:true
    },
    AdditionalDetails:{
        type:mongoose.Schema.Types.ObjectId,     
        required:true,
        ref:"Profile"
    },
    Active: {
        type: Boolean,
        default: true,
    },
    Approved: {
        type: Boolean,
        default: true,
    },
    Courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    Image:{
        type:String,
        required:true
    },
    CourseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgress"
        }
    ],
    Token:{
        type:String
    },
    PasswordLinkExpiry:{
        type:Date 
    }
}, { timestamps :true}
);

module.exports =mongoose.model("User" ,userSchema);