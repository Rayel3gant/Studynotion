const courseSubSection=require("../models/CourseSubSection");
const courseSection =require("../models/CourseSection");
const Course=require("../models/Course")

const deleteCourseSubsection =async(req,res) =>{
    try{

        const { sectionID ,subsectionID ,courseId} =req.body;

        const updatedSectionDetails=await courseSection.findByIdAndDelete(
            {_id:sectionID},
            {
                $pull:{
                    SubSection:subsectionID
                }
            },
            {new:true}
        )
        
        await courseSubSection.findByIdAndDelete(subsectionID);

        const updatedCourseData =await Course.findById(courseId)
            .populate({
                path:"CourseContent",
                populate:{
                    path:"SubSection",
                },
            })
            .exec();

        res.status(200).json({
            success:true,
            message:"course sub-section deleted successfully ",
            data:updatedCourseData
        })


    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"can not delete course sub-section ,try again later"
        })

    }
}
module.exports=deleteCourseSubsection;