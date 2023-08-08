const Category=require("../models/Category");
const createCategory=async(req,res)=>{
    try{
        //fetch data
        const { categoryName , Description } =req.body;


        //validation
        if(! categoryName || !Description){
            return res.status(400).json({
                success:false,
                message:"Data missing"
            })
        } 
        const categoryData= await Category.findOne({Category:categoryName});
        if(categoryData){
            return res.status(400).json({
                success:false,
                message:"Category already created",
                data:tagData
            })
        }

        //create new category
       const newCategory =await Category.create({Category:categoryName,Description:Description});
       res.status(200).json({
            success:true,
            message:"category creation successful",
            data:newCategory
       })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in category creation"
        })
    }
}
module.exports=createCategory;