const mongoose=require("mongoose");
const categorySchema=new mongoose.Schema({
    Category:{
        type:String,
        required:true
    },
    Description:{
        type:String
    },
    Course:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
            required:true 
        }
    ]
});
module.exports=mongoose.model("Category",categorySchema);