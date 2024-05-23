import React from 'react'
import { Link } from 'react-router-dom';
import RatingStars from "../../common/RatingStars"
import { useState } from 'react';
import { useEffect } from 'react';
import  GetAvgRating  from "../../../utils/avgRating";
import { BsCurrencyRupee } from "react-icons/bs"

const CourseCard = (props) => {
    const course=props.course; 
    const [avgRating , setRating] =useState(0);

    useEffect(()=>{
        // console.log("course rating",course.RatingAndReviews)
        const rating = GetAvgRating(course.RatingAndReviews.Rating);
        // console.log(rating)
        setRating(rating);
    },[course]);


  return (
    <Link  to={`/course/${course._id}`}>
        <div className='flex flex-col gap-y-1 w-[350px] h-[400px] '>
            <img src={course.Thumbnail} alt='' className='w-[350px] h-[200px] rounded-md'/>
            <div className=''>
                <div className='text-sm text-richblack-5 h-[60px]'>
                    {course.CourseDescription.length > 15 ? (`${course.CourseDescription.split(" ").slice(0,15).join(" ")} ...`): course.CourseDescription }
                </div>
                <div className='text-sm text-richblack-300'>{course.CourseTitle}</div>
                <div className='text-sm text-richblack-300'>{course.Instructor.FirstName} {course.Instructor.LastName}</div>
                <div className='flex gap-x-2 items-center text-yellow-50'>
                    <div className=''>{ avgRating || 0}</div>
                    <RatingStars Review_Count={avgRating} />
                    <div><span>{`(`}</span> {course.RatingAndReviews.length} Ratings <span>{`)`}</span></div>
                </div>

                <div className='flex gap-x-1 text-richblack-300 text-sm items-center'>
                    <BsCurrencyRupee/>
                    {course.CoursePrice}
                </div>
            </div>
        </div>
    </Link >
  )
}

export default CourseCard