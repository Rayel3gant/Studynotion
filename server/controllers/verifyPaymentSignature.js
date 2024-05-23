const User=require("../models/User");
const Course=require("../models/Course");
const mailSender=require("../functions/MailSender");
require("dotenv").config();
const {courseEnrollmentEmail} =require("../templates/courseEnrollmentEmail")
const crypto=require("crypto");
const CourseProgress = require("../models/CourseProgress");

const enrollStudent=async(courses , userID , res)=>{
    try{
        if( ! courses || ! userID){
            return res.status(400).json({
                success:false,
                message:"data missing while enrolling student to courses"
            })
        }

        for( const courseID of courses){
            try{
                const updatedCourse=await Course.findByIdAndUpdate(
                    {_id:courseID},
                    {
                        $push:{
                            EnrolledStudents:userID
                        }
                    },
                    {new:true}
                )
                if( ! updatedCourse){
                    return res.status(500).json({
                        success:false,
                        message:"course not found while enrolling students"
                    })
                }
                const courseProgressEntry=await CourseProgress.create({
                    courseId:courseID,
                    userId:userID,
                    CompletedVideos:[]
                })
    
                const updatedUser= await User.findByIdAndUpdate(
                    {_id:userID},
                    {
                        $push:{
                            Courses:courseID  ,
                            CourseProgress:courseProgressEntry._id
                        }
                    },
                    {new:true}
                )

                

                
    
                const mailResponse=await mailSender(
                    updatedUser. Email,
                    `Successfully enrolled into ${ updatedCourse.CourseTitle}}`,
                    courseEnrollmentEmail(updatedCourse.CourseTitle , `${updatedUser.FirstName}`)
                    
                )
    
                console.log("mail response",mailResponse.response);
            }  catch(error){
                console.error(error);
                return res.status(400).json({
                    success:false,
                    messgae:"error in course enrollment"
                })
            }
        }

        

    } catch(error){
        console.error(error)
    }
}


// matches the signature created by us and returned bu razorpay , if it matches => payment success => assign course to student
const verifyPaymentSignature=async(req,res) =>{
    const razorpay_order_id=req?.body?.razorpay_order_id;
    const razorpay_payment_id=req?.body?.razorpay_payment_id;
    const razorpay_signature=req?.body?.razorpay_signature;
    const courses=req?.body?.courses;
    const userID=req.user.id;

    //validate
    if( ! razorpay_order_id || ! razorpay_payment_id || !razorpay_signature || ! courses || ! userID){
        return res.status(404).json({
            success:false,
            message:"data missing while attempting to verify payment signature"
        })
    }

    let body =razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature=crypto.createHmac("sha256",process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");

    if(expectedSignature === razorpay_signature){

        //enroll student to the course

        await enrollStudent( courses , userID ,res)

        return res.status(200).json({
            success:true,
            message:"payment verified"
        })
    }

    return res.status(200).json({
        success:false,
        message:"payment verification failed"
    })
     
}
module.exports=verifyPaymentSignature;


