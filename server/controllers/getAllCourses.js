const Course =require("../models/Course");



const getAllCourse =async(req,res) =>{
    try{
        const courseDetails =await Course.find({Status:"Published"},{
            CourseTitle:true,
            CourseDescription:true,
            CoursePrice:true,
            Instructor:true,
            RatingAndReviews:true,
            EnrolledStudents:true

        }).populate("Instructor").exec(); 

        res.status(200).json({
            success:true,
            message:"All Courses fetched successfully",
            data:courseDetails
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"can not fetch whole course list"
        })
    }
}
module.exports=getAllCourse;