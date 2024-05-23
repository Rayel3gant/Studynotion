const Category=require("../models/Category");
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}
const categoryTopCourses=async(req,res)=>{
    try {
        const { categoryId } = req.body
        console.log("PRINTING CATEGORY ID: ", categoryId);
        // Get courses for the specified category
        const selectedCategory = await Category.findById(categoryId)
          .populate({
            path: "Course",
            match: { Status: "Published" },
            
            populate:{
              path:"RatingAndReviews",
            }, 
            populate: {
              path: "Instructor",
            },
            
          })
          .exec()
    
        console.log("SELECTED COURSE", selectedCategory)
        // Handle the case when the category is not found
        if (!selectedCategory) {
          console.log("Category not found.")
          return res.status(404).json({ 
            success: false, 
            message: "Category not found" 
          })
        }
        // Handle the case when there are no courses
        if (selectedCategory.Course.length === 0) {
          console.log("No courses found for the selected category.")
          return res.status(404).json({
            success: false,
            message: "No courses found for the selected category.",
          })
        }
    
        // Get courses for other categories
        const categoriesExceptSelected = await Category.find({
          _id: { $ne: categoryId },
        })
        let differentCategory = await Category.findOne(
          categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
            ._id
        )
          .populate({
            path: "Course",
            match: { Status: "Published" },
            populate: {
              path:"RatingAndReviews"
            },
            populate: {
              path: "Instructor",
          },
          })
          .exec()
          console.log("Different COURSE", differentCategory)
        // Get top-selling courses across all categories
        const allCategories = await Category.find()
          .populate({
            path: "Course",
            match: { Status: "Published" },
            populate:{
              path:"RatingAndReviews"
            },
            populate: {
              path: "Instructor",
          },
          })
          .exec()
        const allCourses = allCategories.flatMap((category) => category.Course)
        const mostSellingCourses = allCourses
          .sort((a, b) => b.sold - a.sold)
          .slice(0, 10)
         // console.log("mostSellingCourses COURSE", mostSellingCourses)
        res.status(200).json({
          success: true,
          data: {
            selectedCategory,
            differentCategory,
            mostSellingCourses,
          },
        })
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        })
      }
}
module.exports=categoryTopCourses;