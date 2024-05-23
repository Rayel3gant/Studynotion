const courseSubSection =require("../models/CourseSubSection");
const courseSection=require("../models/CourseSection");
const Course =require("../models/Course")
const fileUploader=require("../functions/fileUploader");
require("dotenv").config();

const createCourseSubSection=async(req,res) =>{
    try{
        // fetch data and video
        const { title ,description , sectionId ,courseId} =req.body;
        const videoFile =req.files.video; 

        const SubSectionName=title;
        const Description =description;
        const sectionID=sectionId;

        console.log("inside create subsection controller");
        console.log("subsectioN",SubSectionName);
        console.log("descriptioN",Description);
        console.log("section id",sectionID)
        console.log("video file",videoFile)

        //validate
        if(!SubSectionName  || !sectionID ||!Description || !videoFile) {
            return res.status(400).json({
                success:false,
                message:"data missing while creating course sub-section"
            })
        }


        //upload video to cloudinary
        const uploadVideoToCloudinary =await fileUploader(videoFile,process.env.CLOUDINARY_FOLDER_NAME);
        const VideoURL=uploadVideoToCloudinary.secure_url;
         
        //create sub section
        const newSubSection =await courseSubSection.create(
            {
                SubSectionName:SubSectionName,
                TimeDuration:`${uploadVideoToCloudinary.duration}`,
                Description:Description,
                VideoURL:VideoURL
            }
        )

        //add this subsection to section
        const updatedSection= await courseSection.findByIdAndUpdate(
            {_id:sectionID},
            {
                $push:{
                    SubSection:newSubSection._id
                }
            },
            {new:true}
        ).populate("SubSection").exec();   // ?

        const updatedCourseData =await Course.findById(courseId)
            .populate({
                path:"CourseContent",
                populate:{
                    path:"SubSection",
                },
            })
            .exec();

        

        res.status(200).json({
            success:true,
            message:"course sub-section created successfully",
            data:updatedCourseData
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error  in creating course sub-section"
        })
    }
}
module.exports=createCourseSubSection;