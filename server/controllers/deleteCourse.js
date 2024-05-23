const Course= require("../models/Course");
const CourseSection=require("../models/CourseSection")
const CourseSubSection=require("../models/CourseSubSection");
const User=require("../models/User")

const deleteCourse=async(req,res)=>{
    try {
        const { courseId } = req.body
    
        // Find the course
        const course = await Course.findById(courseId)
        if (!course) {
          return res.status(404).json({ message: "Course not found" })
        }
    
        // Unenroll students from the course
        const studentsEnrolled = course.EnrolledStudents
        for (const studentId of studentsEnrolled) {
          await User.findByIdAndUpdate(studentId, {
            $pull: { Courses: courseId },
          })
        }
    
        // Delete sections and sub-sections
        const courseSections = course.CourseContent
        for (const sectionId of courseSections) {
          // Delete sub-sections of the section
          const section = await CourseSection.findById(sectionId)
          if (section) {
            const subSections = section.SubSection
            for (const subSectionId of subSections) {
              await CourseSubSection.findByIdAndDelete(subSectionId)
            }
          }
    
          // Delete the section
          await CourseSection.findByIdAndDelete(sectionId)
        }
    
        // Delete the course
        await Course.findByIdAndDelete(courseId)
    
        return res.status(200).json({
          success: true,
          message: "Course deleted successfully",
        })
      } catch (error) {
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "Server error",
          error: error.message,
        })
      }
}
module.exports=deleteCourse