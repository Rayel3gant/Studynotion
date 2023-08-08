const mongoose =require("mongoose");
const mailSender = require("../functions/MailSender");

const otpSchema=new mongoose.Schema({
    Email:{
        type:String,
       // required:true
    },
    CreatedAt:{
        type:Date,
        required:true,
        default:Date.now(),
        expiry:5 * 60
    },
    OTP:{
        type:Number,
        //required:true
    }
});

async function sendVerificationMail(email,otp){
    try{
        const mailResponse =await mailSender(email ,"Verification mail from Studynotion" ,otp);
        console.log("email sent successfully :" ,mailResponse.response);
    }
    catch(error){
        console.log("error occured while sending mails ", error);
        throw error;
    }
}

// send otp before saving entry to DB  => pre middleware is used
otpSchema.pre("save",async function (next){

	console.log("New document saved to database");

    if(this.isNew){
        console.log("email:",this.Email);
        console.log("otp:",this.OTP);
        await sendVerificationMail(this.Email ,this.OTP);
    }
    next();
})



module.exports=mongoose.model("Otp",otpSchema);