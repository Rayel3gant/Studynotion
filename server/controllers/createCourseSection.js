const courseSection =require("../models/CourseSection");
const Course =require("../models/Course");
const { default: mongoose } = require("mongoose");


const createCourseSection =async(req,res) =>{
    try{
        //fetch data from req
        const { SectionName , courseID } =req.body;
        console.log( "course id",courseID);
        console.log("section name",SectionName);
        console.log(typeof(courseID));


        if(!SectionName || !courseID){
            return res.status(400).json({
                success:false,
                message:"data missing while creating course section"
            })
        }
        //check if same course section name has been used or not

        // const courseSectionData=await Course.findById(courseID)?.CourseContent;

        // courseSectionData.forEach((section) =>{
        //     if(section.SectionName === SectionName){
        //         console.log("section with given name already exists")
        //         return res.status(402).json({
        //             success:false,
        //             message:"given section already created"
        //         })
        //     }
        // })

        //create section
        const newSection =await courseSection.create({
            SectionName:SectionName
        })


        //push section to course
        const updatedCourse=await Course.findByIdAndUpdate(
            {_id:courseID},
            {
                $push:{
                    CourseContent:newSection._id
                }
            },
            {new :true}
        ) .populate({
            path:"CourseContent",
            populate:{
                path:"CourseSubSection",
                strictPopulate:false
            }
        }) .exec();

        res.status(200).json({
            success:true,
            message:"course section creation successfull",
            updatedCourse
        })




    }

    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in course section creation"
        })

    }
}
module.exports=createCourseSection;