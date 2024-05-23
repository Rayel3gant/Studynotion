const User=require("../models/User");
const bcrypt=require("bcrypt");

const resetPassword =async(req,res) =>{
    try{

        //fetch data
        const { token , password , confirmPassword} =req.body ;

        //validate passwords
        if(password!== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Passwords do not match"
            })
        }
        //find user data based on token
        const userData =await User.findOne({Token:token});
        if(!userData){
            return res.status(400).json({
                success:false,
                message:"User not found -> incorrect token"
            })
        }

        //check expiry of link
        if(userData.PasswordLinkExpiry < Date.now()){
            return res.status(400).json({
                success:false,
                message:"token expired"
            })
        }

        //hash password
        const encryptionRounds=10;
        const hashedPasword= await bcrypt.hash(password,encryptionRounds);

        //update the password
        const updatedUserData =await User.findOneAndUpdate({Token:token},{
            Password:hashedPasword
        },{new:true});
        console.log("password reset success")
        res.status(200).json({
            success:true,
            message:"Password reset successful",
            data:updatedUserData
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in resetting password"
        })
    }
}
module.exports=resetPassword;