const CourseProgress = require("../models/CourseProgress");
const CourseSubSection=require("../models/CourseSubSection")
const updateCoursePorogress=async(req,res)=>{
    const { courseId , subsectionId}=req.body;

    console.log("course id:",courseId)
    const userId=req.user.id;
    try{
        const subsectionData=await CourseSubSection.findById(subsectionId);

        if( ! subsectionData){
            console.log("invalid subsection id while updating course progress")
            return res.status(400).json({
                success:false,
                message:"invalid lecture / lecture not found"
            })
        }

        let courseProgress= await CourseProgress.findOne({
            courseId:courseId,
            userId:userId
        })

        if( ! courseProgress ){
            return res.status(400).json({
                success:false,
                message:"course progress does not exist"
            })
        }   
        else{

            if(courseProgress.CompletedVideos.includes(subsectionId)){
                return res.status(400).json({
                    success:false,
                    message:"lecture already marked as complete"
                })
            }
            else{
                courseProgress.CompletedVideos.push(subsectionId)
            }

        }
        await courseProgress.save();
        return res.status(200).json({
            success:true,
            message:"lecture marked completed successfully"
        })
    } catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"error in updating course progress"
        })
    }
}
module.exports=updateCoursePorogress;