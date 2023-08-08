const fileUploader=require("../functions/fileUploader")
require("dotenv").config()
const uploadImage=async(req,res)=>{
    try{
        const {image }=req.body;
        const response=await fileUploader(image,process.env.CLOUDINARY_FOLDER_NAME);

        return res.status(200).json({
            success:true,
            data:response,
            message:"image uploaded to cloudinary succesfully"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Image can not be uploaded to cloudinary "
        })
    }
}
module.exports=uploadImage