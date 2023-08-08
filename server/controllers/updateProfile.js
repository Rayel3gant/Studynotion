// we have already created the profile during sign up process , no need to create new one
// just update that one with data given

const Profile=require("../models/Profile");
const User=require("../models/User");



const updateProfile= async(req,res) =>{
    try{
        //fetch data
        const { firstName="",lastName="",dateOfBirth="",gender="",contactNumber="",about=""} =req.body;
        const userID=req.user.id;  // added in authentication middleware

        const userData=await User.findById(userID);
        const profileData=await Profile.findById(userData.AdditionalDetails);

        await User.findByIdAndUpdate(
            {_id:userID},
            {FirstName:firstName},
            {LastName:lastName},
            {new:true}
        )

        profileData.Gender=gender;
        profileData.DoB=dateOfBirth;
        profileData.About=about;
        profileData.ContactNo=contactNumber

        await profileData.save()

        const updatedUserData=await User.findById(userID).populate("AdditionalDetails").exec()

        return res.status(200).json({
            success:true,
            message:"user data update succesfully",
            data:updatedUserData
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in profile updating process"
        })
    }
}
module.exports=updateProfile;