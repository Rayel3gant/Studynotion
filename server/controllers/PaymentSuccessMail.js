const mailSender = require("../functions/MailSender");
const User = require("../models/User");
const {paymentSuccessMailTemplate} =require("../templates/paymentSuccessMailTemplate")

const PaymentSuccessMail=async(req,res)=>{
    console.log("inside payment success mail send controller")
    try{
        const { orderID , paymentID, amount}=req.body;
        console.log("order id:",orderID);
        console.log("payment id:",paymentID);
        console.log("amount:",amount)
        const userID=req.user.id;

        if( !orderID || ! paymentID || !amount || !userID){
            return res.status(400).json({
                success:false,
                message:"data missing while sending successful payment mail"
            })
        }

        const studentData=await User.findById(userID);
        await mailSender(
            studentData.Email,
            `Payment recieved`,
            paymentSuccessMailTemplate(`${studentData.FirstName}`,amount/100,orderID, paymentID)
        )
        console.log("payment success email sent successfully")

    } catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"error in sending payment success mail"
        })
    }
}
module.exports=PaymentSuccessMail;