const mongoose=require("mongoose");

const ratingAndReviewSchema =new mongoose.Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    Course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    Rating:{
        type:Number,
        required:true,
        enum:[1,2,3,4,5]
    },
    Review:{
        type:String,
        trim:true,
        required:true
    }
});
module.exports=mongoose.model("RatingAndReview",ratingAndReviewSchema);