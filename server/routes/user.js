const express=require("express");
const router=express.Router();

const login=require("../controllers/Login");
const signup=require("../controllers/signUp");
const sendOtp=require("../controllers/sendOTP");
const changePassword = require("../controllers/changePassword");
const resetPassword=require("../controllers/resetPassword");
const sendResetPasswordMail=require("../controllers/sendResetPasswordMail");
const Authentication=require("../middlewares/Authentication");
const resetUserPassword = require("../controllers/resetUserPassword");

router.post("/login",login);
router.post("/signup",signup);
router.post("/sendOtp",sendOtp);
router.post("/changePassword",Authentication,changePassword);
router.post("/sendResetPasswordMail",sendResetPasswordMail);
router.post("/resetPassword",resetPassword);
router.post("/resetUserPassword",Authentication,resetUserPassword)




module.exports=router;