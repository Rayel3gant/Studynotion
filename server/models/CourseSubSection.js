const mongoose =require("mongoose");
const CourseSubSectionSchema=new mongoose.Schema({
    SubSectionName:{
        type:String,
    },
    TimeDuration:{
        type:String,
    },
    Description:{
        type:String,
    },
    VideoURL:{
        type:String,
    }
});
module.exports=mongoose.model("CourseSubSection",CourseSubSectionSchema);