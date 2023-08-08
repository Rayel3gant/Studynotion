const Category =require("../models/Category");

const getAllCategory=async(req,res) =>{
    try{
        const categoryData= await Category.find ( {} ,{
            Category:true,
            Description:true
        })

        res.status(200).json({
            success:true,
            message:"categories data fetched successfully",
            data:categoryData
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"can't get tag details"
        })
    }
}
module.exports=getAllCategory;