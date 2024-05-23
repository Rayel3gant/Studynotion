
const cloudinary =require("cloudinary");
require("dotenv").config();


const cloudinaryConnect= ()=>{
    try{
        cloudinary.v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_SECRET_KEY,
            secure: true,
        });

        console.log("connected with cloudinary");

    }

    catch(error){
        console.log(error);
        console.log("can not connect with cloudinary");
    }
}
module.exports=cloudinaryConnect;