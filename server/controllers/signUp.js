const User=require("../models/User");
const OTP =require("../models/Otp");
const bcrypt =require("bcrypt");
const Profile=require("../models/Profile");


const signUp=async(req,res) =>{
    try{

        //fetch data from request
        const { FirstName, LastName ,Email , ContactNo,Password ,ConfirmPassword, AccountType ,otp} =req.body;
        console.log("first name:",FirstName);
        console.log("last name:",LastName);
        console.log("password:",Password);
        console.log("confirmPassword:",ConfirmPassword);
        console.log("mail:",Email);
        console.log("Account type",AccountType);
        console.log("OTP:",otp)

        if(!FirstName || !LastName || !Email || !Password || ! ConfirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:"data missing"
            })
        }
        //match both passwords
        if(Password!==ConfirmPassword){
            return res.status(400).json({
                success:false,
                message:"Passwords don't match"
            })
        }

        //search if user already exists
        const searchUserData=await User.findOne({Email});
        if(searchUserData){
            return res.status(400).json({
                success:false,
                message:"User already exists!!!",
                data:searchUserData
            })
        }

        //match the otp

        //find most recent otp
        const searchOtpData=await OTP.find({Email}).sort({CreatedAt:-1}).limit(1);
        
        // otp not found
        if(!searchOtpData || searchOtpData.length===0){
            return res.status(400).json({
                success:false,
                message:"otp not valid"
            })
        }

        else if(searchOtpData[0].OTP !== Number(otp)){
            return res.status(400).json({
                success:false,
                message:"OTP Validation failed!!!"
            })
        }

        //hash the password

        const encryptionRounds=10;
        const hashedPassword =await bcrypt.hash(Password,encryptionRounds);

        //save user  in db

        //create a profile for user   => we will fill the data when user provides it later

        let Approved = "";
		Approved === "Instructor" ? (Approved = false) : (Approved = true);

         const userProfile =await Profile.create({
            ContactNo :null,College:null,Gender:null,DoB:null,About:null
         });

        const savedUser =await User.create({
            FirstName,LastName, Email, Password:hashedPassword,ContactNo,AdditionalDetails:userProfile._id,AccountType,
            Approved:Approved,
            Image:`https://api.dicebear.com/5.x/initials/svg?seed=${FirstName}${LastName}`
        })

        return  res.status(200).json({
            success:true,
            message:"User sign up successful ,Welcome to Studynotion",
            data:savedUser
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"can't sign up now"
        })
    }
}
module.exports =signUp;