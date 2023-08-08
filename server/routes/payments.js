const express =require("express");
const router=express.Router();
const paymentInitiation=require("../controllers/paymentInitiation");
const verifyPaymentSignature=require("../controllers/verifyPaymentSignature");


const checkStudent=require("../middlewares/checkStudent");
const Authentication=require("../middlewares/Authentication");
const PaymentSuccessMail = require("../controllers/PaymentSuccessMail");

router.post("/paymentInitiation",Authentication,checkStudent,paymentInitiation);
router.post("/verifyPaymentSignature",Authentication,checkStudent,verifyPaymentSignature);
router.post("/sendPaymentSuccessEmail",Authentication,checkStudent,PaymentSuccessMail)

module.exports=router;