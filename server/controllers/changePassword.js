const User =require("../models/User");
const mailSender=require("../functions/MailSender");
require("dotenv").config();

const changePassword= async(req,res)=>{
    try{
        
        //fetch password
        const { Email, password } =req.body;

        const userData=await User.findOne({Email:Email});
        if(!userData){
            return res.status(400).json({
                success:false,
                message:"User do not exist"
            })
        }

        if(password!==userData.Password){
            return res.status(400).json({
                success:false,
                message:"incorrect password ,try again"
            })
        }

        const token =crypto.randomUUID();
        

        // now update user data token and passwordlink expiry

        const updatedUserData= await User.findOneAndUpdate({Email:Email},{
            Token:token,
            PasswordLinkExpiry:Date.now() +5*60 *1000,
        } ,{new :true});          // this returns updated doc
        console.log("updated user details:",updatedUserData);

        //create url
        const passwordURL = `http://localhost:3000/updatePassword/${token}`;      //front end link

        //send mail with this url
        try{
            const mailTitle="click here to change password";
            const mailResponse =await mailSender(Email ,mailTitle ,`Password reset link : ${passwordURL}`);
        }
        catch(error){
            console.log(error);
            return res.status(400).json({
                success:false,
                message:"error in sending reset password mail"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Password reset mail sent , check mail"
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"can't change password now"
        })
    }
}
module.exports=changePassword;