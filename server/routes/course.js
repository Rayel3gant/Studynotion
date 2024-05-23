const express=require("express");
const router=express.Router();


const createCourse=require("../controllers/createCourse");
const getAllCourses=require("../controllers/getAllCourses");
const getCourseDeatils=require("../controllers/getCourseDetails");
const getCategoryDetails=require("../controllers/getCategoryDetails");
const createCategory=require("../controllers/createCategory");
const getAllCategory=require("../controllers/getAllCategory");
const createCourseSection=require("../controllers/createCourseSection");
const updateCourseSection=require("../controllers/updateCourseSection");
const deleteCourseSection=require("../controllers/deleteCourseSection");
const createCourseSubSection=require("../controllers/createCourseSubSection");
const deleteCourseSubsection = require("../controllers/deleteCourseSubsection");
const updateCourseSubsection=require("../controllers/updateCourseSubsection");
const createRating =require("../controllers/createRating");
const getAverageRating =require("../controllers/getAverageRating");
const getAllRatings=require("../controllers/getAllRatings");
const deleteCourse=require("../controllers/deleteCourse")
const getInstructorCourses =require("../controllers/getInstructorCourses")
const getFullCourseDetails=require("../controllers/getFullCourseDetails")


const checkStudent=require("../middlewares/checkStudent");
const checkAdmin=require("../middlewares/checkAdmin");
const checkInstructor=require("../middlewares/checkInstructor");
const Authentication=require("../middlewares/Authentication");
const   uploadImage  = require("../controllers/uploadImage");
const editCourse  = require("../controllers/editCourse");
const editCourseSection = require("../controllers/editCourseSection");
const editCourseSubSection = require("../controllers/editCourseSubSection");
const categoryTopCourses = require("../controllers/categoryTopCourses");
const deleteUserEnrolledCourse = require("../controllers/deleteUserEnrolledCourse");
const updateCoursePorogress = require("../controllers/updateCourseProgress");


// Courses can Only be Created by Instructors
router.post("/createCourse",Authentication,checkInstructor,createCourse);
router.post("/editCourse",Authentication,checkInstructor,editCourse)
router.post("/createCourseSection",Authentication,checkInstructor,createCourseSection);
router.post("/editCourseSection",Authentication,checkInstructor,editCourseSection);
router.post("/editCourseSubSection",Authentication,checkInstructor,editCourseSubSection);
router.post("/createCourseSubSection",Authentication,checkInstructor,createCourseSubSection);
router.post("/updateCourseSection",Authentication,checkInstructor,updateCourseSection);
router.post("/updateCourseSubsection",Authentication,checkInstructor,updateCourseSubsection);
router.delete("/deleteCourseSection",Authentication,checkInstructor,deleteCourseSection);
router.delete("/deleteCourseSubsection",Authentication,checkInstructor,deleteCourseSubsection);
router.get("/getAllCourses",getAllCourses);
router.get("/getCourseDeatils",getCourseDeatils);
router.post("/uploadImage",uploadImage);
router.delete("/deleteCourse",Authentication,checkInstructor,deleteCourse);
router.get("/getInstructorCourses",Authentication,checkInstructor,getInstructorCourses);
router.post("/getFullCourseDetails",Authentication,getFullCourseDetails);



// Category can Only be Created by Admin
router.post("/createCategory",Authentication,checkAdmin,createCategory);
router.get("/getAllCategory",getAllCategory);
router.get("/getCategoryDetails",getCategoryDetails);


router.post("/createRating",Authentication,checkStudent,createRating);
router.post("/deleteUserEnrolledCourse",Authentication,checkStudent,deleteUserEnrolledCourse)
router.get("/getAverageRating",getAverageRating);
router.get("/getReviews",getAllRatings);
router.post("/getCategoryPageDetails",categoryTopCourses)
router.post("/updateCourseProgress",Authentication,checkStudent,updateCoursePorogress)


module.exports=router;