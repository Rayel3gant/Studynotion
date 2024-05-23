const mongoose =require("mongoose");


const courseSchema = new mongoose.Schema({
    CourseTitle:{
        type:String,
        required:true
    },
    CourseDescription:{
        type:String,
        trim:true,
        required:true
    },
    CoursePrice:{
        type:Number,
        required:true
    },
    CourseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseSection",
        }
    ],
    EnrolledStudents:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    Instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    Language:{
        type:String
    },
    LastUpdated:{
        type:String,
        default:Date.now()
    },
    Learnings:{
        type:String
    },
    RatingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"
        }
    ],
    Thumbnail:{
        type:String
    },
    Category:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Category"
        }
    ],
    Tag:{
        type:[Object]
    },
    Instructions: {
		type: [Object],
	},
	Status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    CreatedAt:{
        type: String,
        default:Date.now()
    },
    TotalDuration:{
        type:String
    }
});
module.exports= mongoose.model("Course",courseSchema);

//add creation time ,duration