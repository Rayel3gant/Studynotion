const instance = require("../config/razorpayConnection");
const User = require("../models/User");
const Course = require("../models/Course");
const mailSender = require("../functions/MailSender");
const { default: mongoose } = require("mongoose");
// begins execution when we click buy now button
const capturePayment=async(req,res)=>{
    // fetch courseID and userID
    const userID = req.user.id;
    const { courses } = req.body;

    //validate

    if (!courses || !userID) {
        return res.status(400).json({
            success: false,
            message: "data missing while trying to initiate payment",
        });
    }

    let totalAmount=0;
    for(const course_id of courses){
        let course;
        try{
            course=await Course.findById(course_id);
            if(! course){
                return res.status(404).json({
                    success:false,
                    message:"Course not found while purchasing it"
                })
            }

            //check if user has already enrolled for same course or not
            // now user id is in string format , convert it to object format

            if (course.EnrolledStudents.includes(new mongoose.Types.ObjectId(userID))) {
                return res.status(400).json({
                    success: false,
                    message: "user has already enrolled for this course",
                });
            }

            totalAmount+=course.CoursePrice;
          
        } catch(error){
            console.error(error);
            return res.status(500).json({
                success:false,
                message:"error in payment initiation"
            })
        }
    }

    const options={
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
        notes: {                                 // to use it after signature verification
            userID: userID,
        },
    }

    try{
        //creating order
        const paymentResponse = await  instance.orders.create(options);
        return res.status(200).json({
            success:true,
            message:paymentResponse
        })
    } catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"error while creating order in payment initiation controller"
        })
    } 
}
module.exports=capturePayment;

