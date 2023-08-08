const courseSection =require("../models/CourseSection");
const Course =require("../models/Course");
const {  default: mongoose } = require("mongoose");

const deleteCourseSection =async(req,res) =>{
    try{

        const { sectionID , courseID} =req.body;
      
        if(! sectionID || !courseID){
            return res.status(400).json({
                success:false,
                message:"data missing while deleting course section"
            })
        }

        await Course.findByIdAndUpdate(
            {_id:courseID},
            {
                $pull:{
                    CourseContent:sectionID
                }
            },
            {new :true}
        )

        await courseSection.findByIdAndDelete(sectionID);

        const updatedCourseDetails = await Course.findById(courseID).populate({
            path:"CourseContent",
            populate:{
                path:"SubSection"
            }
        })

        res.status(200).json({
            success:true,
            message:"course section deleted",
            data:updatedCourseDetails
        })



    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in deleting course section"
        })
    }
}
module.exports=deleteCourseSection;