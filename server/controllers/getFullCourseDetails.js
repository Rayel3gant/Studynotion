const { convertSecondsToDuration } = require("../functions/secToDuration");
const Course=require("../models/Course");
const CourseProgress=require("../models/CourseProgress")

const getFullCourseDetails=async(req,res)=>{
  console.log(req.body)
    try {
        const { courseId } = req.body;
        console.log("COURSE ID", courseId)
        const userId = req.user.id
        const courseDetails = await Course.findById({
          _id: courseId,
        })
          .populate({
            path: "Instructor",
            populate: {
              path: "AdditionalDetails",
            },
          })
          .populate("Category")
          .populate("RatingAndReviews")
          .populate({
            path: "CourseContent",
            populate: {
              path: "SubSection",
            },
          })
          .exec()
    
        let courseProgressCount = await CourseProgress.findOne({
          courseId: courseId,
          userId: userId,
        })
    
        console.log("courseProgressCount : ", courseProgressCount)
    
        if (!courseDetails) {
          return res.status(400).json({
            success: false,
            message: `Could not find course with id: ${courseId}`,
          })
        }
    
        if (courseDetails.status === "Draft") {
          return res.status(403).json({
            success: false,
            message: `Accessing a draft course is forbidden`,
          });
        }
    
        let totalDurationInSeconds = 0
        courseDetails.CourseContent.forEach((content) => {
          content.SubSection.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
          })
        })
    
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
    
        return res.status(200).json({
          success: true,
          data:{
            courseDetails,
            totalDuration,
            completedVideos: courseProgressCount?.CompletedVideos
              ? courseProgressCount?.CompletedVideos
              : [],
          }
         
        })
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        })
      }
}
module.exports=getFullCourseDetails;