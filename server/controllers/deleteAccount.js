const Profile=require("../models/Profile");
const User=require("../models/User");
const Course=require("../models/Course");

// for student accounts now
const deleteAccount= async(req,res)=>{
    try{

        // TODO: Find More on Job Schedule
		// const job = schedule.scheduleJob("10 * * * * *", function () {
		// 	console.log("The answer to life, the universe, and everything!");
		// });
		// console.log(job);

        //fetch user id , as user is logged in , it is available in req

        
        const userID= req.user.id;


        //validate user
        const userData=await User.findById(userID);
        if(! userData){
            return res.status(400).json({
                success:false,
                message:"can not find User"
            })
        }

        //delete profile
        const profileID = userData.AdditionalDetails;
        await Profile.findOneAndDelete(profileID);

        //remove the user from all enrolled courses

        // const userCourses=userData.Courses;
        // userCourses.forEach( async(enrolledCourse) =>{
        //     const courseID=enrolledCourse._id;
        //     const courseDetails=await Course.findById(courseID);
        //     courseDetails.EnrolledStudents.findByIdAndDelete(userID);  //?

        // })

        //delete user
        await User.findByIdAndDelete(userID);

        res.status(200).json({
            success:false,
            message:"account deleted successfully"
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"can not delete account now , try again later"
        })
    }
}
module.exports=deleteAccount;