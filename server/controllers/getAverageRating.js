
const RatingAndReview=require("../models/RatingAndReview");
const Course=require("../models/Course");
const { default: mongoose } = require("mongoose");

const averageRating= async(req,res)=>{
    try{

        const { courseID }=req.body;

        if( !courseID){
            return res.status(400).json({
                success:false,
                message:"data missing while calculating average rating of course"
            })
        }

        const courseData=await Course.findById(courseID);
        const totalRating=0;
        await courseData.RatingAndReviews.forEach( async(rating) =>{
            const reviewData= await RatingAndReview.findById(rating);
            totalRating+=reviewData.Rating;
        })
        const resultantRating =totalRating / courseData.RatingAndReviews.length;


        const calculateAverage =await RatingAndReview.aggregate([
            {
                $match:{
                    Course:new mongoose.Types.ObjectId(courseID)
                }
            },
            {
                $group:{
                    _id:null,
                    average: { $avg :"$Rating"}
                }
            }
        ])
        if(calculateAverage.length>0){
            res.status(200).json({
                success:true,
                message:"average rating computation successful",
                data:calculateAverage[0].average
            })
        }

        res.status(200).json({
            success:true,
            message:"no course ratings available now",
            data:0    // return 0 as rating
        })


       
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in getting average rating"
        })
    }
}
module.exports=averageRating;