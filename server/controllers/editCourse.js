const fileUploader=require("../functions/fileUploader")
const Course=require("../models/Course");

const editCourse=async(req,res)=>{
    try {
        const { courseID } = req.body
        const updates = req.body
        const course = await Course.findById(courseID)
    
        if (!course) {
          return res.status(404).json({ error: "Course not found" })
        }
    
        // If Thumbnail Image is found, update it
        if (req.files) {
          console.log("thumbnail update")
          const thumbnail = req.files.courseImage
          const thumbnailImage = await fileUploader(
            thumbnail,
            process.env.FOLDER_NAME
          )
          course.Thumbnail = thumbnailImage.secure_url
        }
    
        // Update only the fields that are present in the request body
        for (const key in updates) {
          if (updates.hasOwnProperty(key)) {
            if (key === "courseTags" || key === "courseInstructions") {
              course[key] = JSON.parse(updates[key])
            } else {
              course[key] = updates[key]
            }
          }
        }
    
        await course.save()
    
        const updatedCourse = await Course.findOne({
          _id: courseID,
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
    
        res.json({
          success: true,
          message: "Course updated successfully",
          data: updatedCourse,
        })
      } catch (error) {
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        })
      }
}
module.exports=editCourse;