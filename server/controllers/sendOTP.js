
const  User  = require("../models/User");
const otpGenerator=require("otp-generator");
const Otp =require("../models/Otp");


//function to generate otp
const giveMeOTP = () =>{
    return otpGenerator.generate(6,{
        lowerCaseAlphabets:false,
        upperCaseAlphabets:false,
        specialChars:false
    });
}

const sendOTP= async(req,res) =>{
    try{
        //fetching email from request
        const { userMail } = req.body;

        if(!userMail){
            return res.status(404).json({
                success:false,
                message:"email is missing ,"
            })
        }

        // check if user already exist
        const userData = await User.findOne({Email:userMail});
        if(userData){
            return res.status(401).json({
                success:false,
                message:"User already exists!!",
                data:userData
            })
        }

        //generate otp

       var generatedOTP= giveMeOTP();

        console.log("otp generated: " ,generatedOTP);

        // now check if otp is created before already or not

        const OtpData=await Otp.findOne({OTP:generatedOTP});
        while(OtpData){
            generatedOTP = giveMeOTP();
            OtpData=await Otp.findOne({OTP:generatedOTP});
        }

        //save otp to db

        console.log("email:",userMail);
        console.log("otp:",generatedOTP);

        const savedOtp =await Otp.create({Email:userMail ,OTP:generatedOTP});
        console.log("saved otp entry:" ,  savedOtp);

        res.status(200).json({
            success:true,
            message:"OTP created successfully",
            data:savedOtp
        })




    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in OTP creation"
        })

    }
}
module.exports=sendOTP;