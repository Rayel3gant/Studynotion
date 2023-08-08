const CourseSubSection=require("../models/CourseSubSection");
const CourseSection=require("../models/CourseSection")

const updateCourseSubSection=async(req,res)=>{
  console.log("inside edit subsection controller");
    try {
        
        const { sectionId,subsectionId, title, description  } = req.body;
        
        console.log("section id",sectionId);
        console.log("subsection id",subsectionId)

        const subSection = await CourseSubSection.findById({_id:subsectionId})
    
        if (!subSection) {
          return res.status(404).json({
            success: false,
            message: "SubSection not found",
          })
        }
    
        if (title !== undefined) {
          subSection.SubSectionName= title
        }
    
        if (description !== undefined) {
          subSection.Description = description
        }
        if (req.files && req.files.video !== undefined) {
          const video = req.files.video
          const uploadDetails = await uploadImageToCloudinary(
            video,
            process.env.FOLDER_NAME
          )
          subSection.VideoURL= uploadDetails.secure_url
          subSection.TimeDuration = `${uploadDetails.duration}`
        }
    
        await subSection.save()
    
        const updatedSection = await CourseSection.findById(sectionId).populate("SubSection").exec()
  
  
        return res.json({
          success: true,
          data:updatedSection,
          message: "Section updated successfully",
        })
      } catch (error) {
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "An error occurred while updating the section",
        })
    }
}
module.exports=updateCourseSubSection