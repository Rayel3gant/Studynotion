const Course=require("../models/Course")
const {convertSecondsToDuration}=require("../functions/secToDuration")


const getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id
  
      // Find all courses belonging to the instructor
      const instructorCourses = await Course.find({
        Instructor: instructorId,
      }).sort({ createdAt: -1 }) .populate({
        path:"CourseContent",
        populate:{
          path:"SubSection"
        }
      })

    for (var i = 0; i < instructorCourses.length; i++) {
      let totalDurationInSeconds = 0
      for (var j = 0; j < instructorCourses[i].CourseContent?.length; j++) {
        totalDurationInSeconds += instructorCourses[i].CourseContent[j].SubSection
          .reduce((acc, curr) => acc + parseInt(curr.TimeDuration), 0)
          instructorCourses[i].TotalDuration=convertSecondsToDuration(totalDurationInSeconds)
      }     
    }

  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instructorCourses,
         
        
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
  }

module.exports=getInstructorCourses;