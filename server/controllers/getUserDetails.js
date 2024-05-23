const User=require("../models/User");
const getUserDetails=async(req,res)=>{
    try{
        const userID=req.user.id;

        if(!userID){
            return res.status(400).json({
                succes:false,
                message:"user id not found"
            })
        }

        const userData=await User.findById(userID).populate("AdditionalDetails").exec();

        if(! userData){
            return res.status(400).json({
                success:false,
                message:"user data not found"
            })
        }

        res.status(200).json({
            success:true,
            message:"fetched user data successfully",
            data:userData
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in fetching user details , try again later"
        })
    }
}
module.exports=getUserDetails;