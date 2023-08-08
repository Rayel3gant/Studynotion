
const RatingAndReview =require("../models/RatingAndReview");
const User= require("../models/User");
const Course=require("../models/Course");

const createRating=async(req,res)=>{
    try{
        const { courseID ,Rating ,Review } =req.body;
        const userID= req.user.id;
        console.log("inside create rating controller")
        console.log("user id:",userID);
        console.log("course id:",courseID);
        console.log("review:",Review);
        console.log("Rating:",Rating)

        if( ! userID || !courseID || ! Rating || ! Review){
            return res.status(400).json({
                success:false,
                message:"data missing while creating new review "
            })
        }
        // check if user is enrolled or not
        const courseData=await Course.findOne(
            {_id:courseID,
                EnrolledStudents: { $elemMatch: {$eq: userID}}               
            });

        if( !courseData){
            return res.status(400).json({
                success:false,
                message:"user not enrolled in the course , try reviewing after buying the course "
            })
        }
        // check if user has already reviewed the course

        const existingReview =await RatingAndReview.findOne({
            User:userID,
            Course:courseID
        })

        if( existingReview){
            return res.status(400).json({
                success:false,
                message:"user already reviwed the course once "
            })

        }


        const userData=await User.findById(userID);
        if(!userData){
            return res.status(400).json({
                success:false,
                message:"could not find user for creating review "
            })
        }

        const newReview=await RatingAndReview.create({
            User: userID,
            Course:courseID,
            Rating:Rating,
            Review:Review
        })
        
        // update course for new review
        const updatedCourseData=await Course.findByIdAndUpdate(
            {_id:courseID},
            {
                $push:{
                    RatingAndReviews:newReview._id
                }
            },
            {new:true}
        )

        res.status(200).json({
            success:true,
            message:"review created successfully",
            courseID:courseID,
            data:newReview

        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"can not send your reveiw now , try again later"
        })
    }
}

module.exports=createRating;