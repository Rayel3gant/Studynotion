const mailSender = require("../functions/MailSender");
const User= require("../models/User");
const crypto=require("crypto");

//reset password token ()
const sendResetPasswordMail= async(req,res)=>{
    try{
        console.log("arrived here")
        const { Email } =req.body;
        console.log("user mail:",Email)
        const userData=await User.findOne({Email:Email});

        if(!userData){
            return res.status(401).json({
                success:false,
                message:"User does not exist"
            })
        }

        //create a token
        const token =crypto.randomBytes(20).toString("hex");
        console.log(token);
        

        // now update user data token and passwordlink expiry

        const updatedUserData= await User.findOneAndUpdate(
            {Email:Email},
            {
                Token:token,
                PasswordLinkExpiry:Date.now() +5*60 *1000,
            } ,
            {new :true}
        );          // this returns updated doc
        console.log("updated user details:",updatedUserData);

        //create url
        const passwordURL = `http://localhost:3000/setNewPassword/${token}`;      //front end link
        console.log( "url:",passwordURL);
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
            message:"Password reset mail sent , check mail",
            data:updatedUserData
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"can not send reset password mail "
        })
    }
}
module.exports=sendResetPasswordMail;