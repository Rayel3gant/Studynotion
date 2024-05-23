const Course =require("../models/Course");
const User=require("../models/User");
const Categories =require("../models/Category");
const fileUploader = require("../functions/fileUploader");
require("dotenv").config();

const createCourse =async(req,res) =>{
    try{

        //fetch data from req.body
        let { CourseTitle, CourseDescription,CoursePrice,Learnings,Category,Instructions,Status,Tag}=req.body;   //  we will have tag ids here 
        console.log("inside create course controller")
        console.log("course title",CourseTitle);
        console.log("course description",CourseDescription)
        console.log("course price",CoursePrice)
        console.log("Learnings",Learnings)
        console.log("category",Category)
        console.log("instructions",Instructions)
        console.log("status",Status)
        console.log("tags",Tag)

        const Thumbnail =req.files.Thumbnail;

        console.log(typeof(Tag));
        console.log(typeof(Instructions));

        console.log("before parsing");
        console.log("tag",Tag);
        console.log("instructions",Instructions)

        const tags=JSON.parse(Tag);
        const instructions=JSON.parse(Instructions);

        
       
        console.log("after parsing")
        console.log("tags",tags);
        console.log("instructions",instructions)

        //validation

        if( ! CourseTitle || !CourseDescription || !CoursePrice || !Learnings ||!Category ||!tags.length || !instructions.length){
            return res.status(400).json({
                success:false,
                message:"data missing while creating course"
            })
        }
        

        if (!Status || Status === undefined) {
            Status = "Draft"
          }

        //check for instructor   => because in a new course we have to store instructor id too
        //also for instructor , we have to store courses made by him too

        const userID=req.user.id;          // both ids are same ???   becausae instructor is also a user , we have user id now we are finding instructor id
        const instructorDetails =await User.findById(userID);

        if(!instructorDetails){
            return res.status(400).json({
                success:false,
                message:"instructor not found"
            })
        }
        console.log("here")

        const categoryDetails =await Categories.findById(Category);
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"category not found"
            })
        }
        console.log("here 1")


        //upload image to cloudinary
        const uploadImageToCloudinary =await fileUploader(Thumbnail,process.env.CLOUDINARY_FOLDER_NAME);
        console.log(uploadImageToCloudinary)

        console.log("here 2")
                
        //create new course entry
        const newCourse =await Course.create({
            CourseTitle,
            CourseDescription,
            CoursePrice,
            Instructor:instructorDetails._id,
            Category:categoryDetails._id,
            Thumbnail:uploadImageToCloudinary.secure_url,
            Status:Status,
            Tag:tags,
            Instructions:instructions,
            Learnings
            
        })

        req.courseID=newCourse._id;

        //add course to instructor's list
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    Courses:newCourse._id
                }
            },
            {new:true}
        )
           
        // add course to category too
        await Categories.findByIdAndUpdate(
            { _id:categoryDetails._id},
            {
                $push:{
                    Course:newCourse._id
                }
            },
            {new:true}
        )

        res.status(200).json({
            success:true,
            message:"course creation successful",
            data:newCourse
        })
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error in course creation"
        })
    }
}
module.exports=createCourse;