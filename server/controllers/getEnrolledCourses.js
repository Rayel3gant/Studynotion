const User=require("../models/User");
const CourseProgress=require("../models/CourseProgress");
const {convertSecondsToDuration}=require("../functions/secToDuration")
const getEnrolledCourses=async(req,res) =>{
    try{
        console.log("inside get enrolled courses controller")
        const userID=req.user.id;
        console.log("user id:",userID)

        const userData=await User.findById({_id:userID})
            .populate({
              path: "Courses",
              populate: {
                path: "CourseContent",
                populate: {
                  path: "SubSection",
                },
              },
            })
            .exec()
        console.log(userData.Courses)

    const userDetails= userData.toObject()
    var SubsectionLength = 0
    for (var i = 0; i < userDetails.Courses.length; i++) {
      let totalDurationInSeconds = 0
      SubsectionLength = 0
      for (var j = 0; j < userDetails.Courses[i].CourseContent.length; j++) {
        totalDurationInSeconds += userDetails.Courses[i].CourseContent[j].SubSection
          .reduce((acc, curr) => acc + parseInt(curr.TimeDuration), 0)
          userDetails.Courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds)
          SubsectionLength +=userDetails.Courses[i].CourseContent[j].SubSection.length
      }
      
      
      let courseProgressCount = await CourseProgress.findOne({
        courseId: userDetails.Courses[i]._id,
        userId: userID,
      })
      courseProgressCount = courseProgressCount?.CompletedVideos.length
      if (SubsectionLength === 0) {
        userDetails.Courses[i].progressPercentage = 100
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2)
        userDetails.Courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier
      }
    }
 
        if(!userData){
            console.log("user data not found")
            return res.status(400).json({
                success:false,
                message:"user data not found"
            })
        }

        res.status(200).json({
            success:true,
            message:"user's enrolled course fetched successfully",
            data:userDetails.Courses
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:"false",
            message:"can not fetch user's enrolled course right now ,try again later"
        })
    }
}
module.exports=getEnrolledCourses;