const{ Email} =require("../templates/contactFormRes");
const MailSender=require("../functions/MailSender")


const contactUs =async(req,res)=>{
    const { email,  countrycode, firstName,lastName,message,phoneno} = req.body
  console.log(req.body)
  try {
    const emailRes = await MailSender(
      email,
      "Your Data send successfully",
      Email(email, firstName, lastName, message, phoneno, countrycode)
    )
    console.log("Email Res ", emailRes)
    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}
module.exports= contactUs