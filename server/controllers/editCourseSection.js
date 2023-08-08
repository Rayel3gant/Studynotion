const courseSection =require("../models/CourseSection");
const Course=require("../models/Course")

const editCourseSection=async(req,res)=>{
    try {
		const { sectionName, sectionId,courseId } = req.body;
		const section = await courseSection.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);

		const course = await Course.findById(courseId)
		.populate({
			path:"CourseContent",
			populate:{
				path:"CourseSubSection",
			},
		})
		.exec();

		res.status(200).json({
			success: true,
			message: section,
			data:course,
		});
	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
}
module.exports=editCourseSection