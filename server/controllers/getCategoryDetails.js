const Category =require("../models/Category");

const getCategoryDetails=async(req,res)=>{
    try{

        //fetch data
        const { categoryID} =req.body;

        // fetch courses of this category
        const categoryCourses =await Category.findById(categoryID).populate("Course").exec();

        if( !categoryCourses){
            return res.status(400).json({
                success:false,
                message:"selected category courses not available right now , try another"
            })
        }

        // getting diffrent category courses
        const remainingCourses=await Category.find({
            _id:{$ne:categoryID}
        }).populate("Course").exec();


        // get top selling based courses according to category



        

        res.status(200).json({
            success:true,
            data:categoryCourses,
            OtherCourses:remainingCourses
        })


    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"can not fetch category details now"
        })
    }
}
module.exports=getCategoryDetails;