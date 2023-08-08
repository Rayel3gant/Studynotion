const RatingAndReview = require("../models/RatingAndReview");

// not course specific ,we are gettinfg all reveiws
const getAllRating =async(req,res) =>{
    try{
        
        const allReviewData =await RatingAndReview.find({})
                                    .sort( {Rating: "desc"})
                                    .populate({
                                        path:'User',
                                        select:"FirstName LastName Image Email"
                                    })
                                    .populate({
                                        path:'Course',
                                        select:'CourseTitle'
                                    })
                                    .exec();

        res.status(200).json({
            success:true,
            message:"all reviews fetched successfully",
            data:allReviewData
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in fetching all ratings"
        })
    }
}
module.exports=getAllRating;