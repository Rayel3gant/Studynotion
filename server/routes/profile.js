const express=require("express");
const router=express.Router();
const deleteAccount=require("../controllers/deleteAccount");
const updateProfile=require("../controllers/updateProfile");
const getUserDetails=require("../controllers/getUserDetails");
const getEnrolledCourses=require("../controllers/getEnrolledCourses");
const updateDisplayPicture=require("../controllers/updateDisplayPicture");
const Authentication=require("../middlewares/Authentication");
const checkStudent=require("../middlewares/checkStudent");
const checkInstructor=require("../middlewares/checkInstructor")
const getInstructorDetails = require("../controllers/getInstructorDetails");


router.delete("/deleteAccount",Authentication,checkStudent,deleteAccount);
router.put("/updateProfile",Authentication,updateProfile);
router.get("/getUserDetails",Authentication,getUserDetails);
router.get("/getEnrolledCourses", Authentication,getEnrolledCourses)
router.put("/updateDisplayPicture",Authentication,updateDisplayPicture);
router.get("/getEnrolledCourses",Authentication,checkStudent,getEnrolledCourses);
router.get("/getInstructorDetails",Authentication,checkInstructor,getInstructorDetails)


module.exports=router;