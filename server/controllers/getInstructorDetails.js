const Course=require("../models/Course")

const getInstructorDetails=async(req,res)=>{
    try{
        const courseDetails=await Course.find({Instructor:req.user.id});

        const courseData=await courseDetails.map((course)=>{
            const totalStudentsEnrolled=course.EnrolledStudents.length;
            const totalIncome= totalStudentsEnrolled * course.CoursePrice;

            const courseStats={
                _id:course._id,
                CourseTitle:course.CourseTitle,
                CourseDescription:course.CourseDescription,
                totalStudentsEnrolled,
                totalIncome
            }
            return courseStats
        })
        return res.status(200).json({
            success:true,
            message:"instructor dashboard details fetched successfully",
            data:courseData
        })
    } catch(error){
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"error in fetching instructor dashboard data"
        })
    }
}
module.exports=getInstructorDetails