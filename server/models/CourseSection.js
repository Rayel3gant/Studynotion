const mongoose =require("mongoose");
const CourseSectionSchema =new mongoose.Schema({
    SectionName:{
        type:String,
        required:true
    },
    SubSection:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseSubSection"
        }
    ]
});
module.exports=mongoose.model("CourseSection",CourseSectionSchema);