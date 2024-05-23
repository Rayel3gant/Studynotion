const courseSection =require("../models/CourseSection");
const Course=require("../models/Course")

const updateCourseSection=async(req,res) =>{
    try{

        const { newSectionName ,sectionID ,courseId} =req.body;
        console.log("inside update section controller")
        console.log("new section name",newSectionName)

        if(! newSectionName || !sectionID){
            return res.status(400).json({
                success:false,
                messgae:"data missing"
            })
        }

       await courseSection.findByIdAndUpdate(
            {_id:sectionID},
            {SectionName:newSectionName},
            {new:true}
        )

        // no need to update course as it contains section id , we are not updating section's id

        const updatedCourse=await Course.findById({_id:courseId}).populate({
            path:"CourseContent",
            populate:{
                path:"SubSection"
            }
        }).exec()


        res.status(200).json({
            success:true,
            message:"section updated successfully",
            updatedCourse
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            succcess:false,
            message:"error in updating course section"
        })
    }
}
module.exports=updateCourseSection;