const Course=require("../models/Course");


const getCourseDetails =async(req,res)=>{
    try{

        //fetch courseID
        const { courseID } =req.body;

        //validate
        if(!courseID){
            return res.status(400).json({
                success:false,
                message:"course ID missing , provide course ID to fetch course details"
            })
        }

        const courseData = await Course.findById(courseID).populate(
            {
                path:"Instructor",
                populate:{
                    path:"AdditionalDetails"
                }
            })
            .populate("RatingAndReviews")
            .populate("Category")
            .populate("EnrolledStudents")
            .populate(
                {
                    path:"CourseContent",
                    populate:{
                        path:"SubSection",
                        //select:"VideoURL"
                    }
                }
            ).exec();     
        
        if(!courseData){
            return res.status(400).json({
                success:false,
                message:"invalid course ID"
            })
        }

        // let totalDurationInSeconds = 0
        // courseDetails.courseContent.forEach((content) => {
        //   content.subSection.forEach((subSection) => {
        //     const timeDurationInSeconds = parseInt(subSection.timeDuration)
        //     totalDurationInSeconds += timeDurationInSeconds
        //   })
        // })
    
        // const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
    

        res.status(200).json({
            success:true,
            message:"Course details fetched successfully ",
            data:courseData
        })
        


    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"can not get course details now ,try again later"
        })
    }
}
module.exports=getCourseDetails;