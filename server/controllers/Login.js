const User = require("../models/User");
const bcrypt=require("bcrypt");
const jwt =require("jsonwebtoken");
require("dotenv").config();

const Login= async(req,res)=>{
    try{

        //fetch data from req
        const { Email ,Password } =req.body;

        if( ! Email || !Password){
            return res.status(403)({
                success:false,
                message:"data missing!!"
            })
        }

        const userData =await User.findOne({Email:Email}).populate("AdditionalDetails");

        if(!userData){
            return res.status(401).json({
                success:false,
                message:"User not found , create a new account"
            })
        }

        //match passwords  => create jwt

        if(await bcrypt.compare(Password ,userData.Password)){

            const payload={
                email:userData.Email,
                id:userData._id,
                AccountType:userData.AccountType                          // doubt here
            }
            const token =jwt.sign(payload,process.env.JWT_KEY,{
                expiresIn:"24h"
            })

            userData.Token=token;
            userData.Password="";
            //create cookie
            const options={
                expires: new Date (Date.now() + 3*24*60*60 *1000),  //3 days
                httpOnly:true
            }
            console.log("user login successful")
            res.cookie("token",token,options).status(200).json({
                success:true,
                message:"log in successful",
                token:token,
                user:userData
            })
        }
        else{
            console.log("login failed => incorrect password")
            return res.status(401).json({
                success:false,
                message:"incorrect password"
            })
        }




    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Log in failed!!!"
        })
    }
}
module.exports=Login;