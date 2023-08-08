const User=require("../models/User");
const fileUploader=require("../functions/fileUploader");
require("dotenv").config();

const updateProfilePicture=async(req,res)=>{
    try{
        console.log("updating user's profile picture")
        const userID=req.user.id;
        const profilePicture=req.files.image;
        console.log(profilePicture)

        if(! userID || !profilePicture){
            return res.status(400).json({
                success:false,
                message:"data missing while updating user's profile picture"
            })
        }

        const uploadImageToCloudinary=await fileUploader(profilePicture,process.env.CLOUDINARY_FOLDER_NAME);

        const updatedUserData=await User.findByIdAndUpdate(
            {_id:userID},
            {Image:uploadImageToCloudinary.secure_url},
            {new:true}
        )
        console.log(updatedUserData);

        res.status(200).json({
            success:true,
            message:"profile picture updated successfully",
            data:updatedUserData
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"user profile picture can not be updated right now",
            error:error
        })
    }
}
module.exports=updateProfilePicture;