const express=require("express");
const contactUs  = require("../controllers/contactUs");
const router=express.Router();

router.post("/contact",contactUs)
module.exports=router