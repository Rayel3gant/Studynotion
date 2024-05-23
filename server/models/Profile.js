const mongoose =require("mongoose");

const profileSchema= new mongoose.Schema({
    Gender:{
        type:String
    },
    DoB:{
        type:Date
    },
    About:{
        type:String,
        trim:true

    },
    ContactNo:{
        type:Number,
        trim:true
    }
});

module.exports =mongoose.model("Profile",profileSchema);