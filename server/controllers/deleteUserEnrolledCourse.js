const Course = require("../models/Course");
const User = require("../models/User");

const deleteUserEnrolledCourse=async(req,res)=>{
    try{
        const { courseID }=req.body;
        const  userId=req.user.id;
        console.log("user id:",userId);
        console.log("course id:",courseID)

        if(! courseID || !userId){
            return res.status(400).json({
                success:false,
                message:"data missing while deleting user enrolled course"
            })
        }
        await Course.findByIdAndUpdate(
            {_id:courseID},
            {
                $pull:{
                    EnrolledStudents:userId
                }
            },{new:true}
        )

        await User.findByIdAndUpdate(
            {_id:userId},
            {
                $pull:{
                    Courses:courseID
                }
            }
        )
        return res.status(200).json({
            success:true,
            message:"user enrolled course deleted successfully"
        })
    } catch(error){
        console.error(error);
        console.log("error in deleting user enrolled course")
        return res.status(500).json({
            success:false,
            message:"can not delete user enrolled course now, try again later"
        })
    }
}
module.exports=deleteUserEnrolledCourse;