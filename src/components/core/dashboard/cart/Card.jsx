import React from 'react';
import { RiDeleteBin6Line } from "react-icons/ri"
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../../../redux/slices/cartSlice';
import ReactStars from "react-rating-stars-component";
import { MdStarHalf } from "react-icons/md";
import { MdStarOutline } from "react-icons/md";
import { MdStar } from "react-icons/md";
import { BiRupee } from "react-icons/bi"

const Card = (props) => {
    const courseData=props.courseData;
    const dispatch=useDispatch();

  return (
    <div className='flex gap-x-4 py-5'>
        
        <img className='w-[200px] h-[150px] rounded-md' src={courseData.Thumbnail} alt=''/>
        

        <div className='flex flex-col'>
            <div className='text-xs text-richblack-5'>{courseData.CourseDescription}</div>
            <div className='text-lg text-richblack-300'>{courseData.CourseTitle}</div>
            <div>{courseData?.Category?.Category}</div>
            <div className='flex items-center text-yellow-100 gap-x-3'>
                <div>4.5</div>
                <ReactStars
                    count={5}
                    size={24}
                    isHalf={true}
                    emptyIcon={<MdStarOutline/>}
                    halfIcon={<MdStarHalf/>}
                    fullIcon={<MdStar/>}
                    activeColor="#ffd700"
                    edit={false}
                />
                <div>{`( ${courseData?.RatingAndReviews?.length} Reviews )`}</div>
            </div>
            <div className='text-richblack-300'>{`Total Courses • Lesson • Beginner`}</div>
        </div>

        <div className='flex flex-col gap-y-5 pt-8'>
            <button className='bg-richblack-700 border-2 border-richblack-800 flex items-center gap-x-3 px-3 py-2 rounded-md text-pink-200 w-fit'  onClick={()=>dispatch(removeFromCart(courseData._id))}>
                {<RiDeleteBin6Line/>}<div>Delete</div>
            </button>
            <div className='text-3xl text-yellow-50 font-bold flex items-center gap-x-2'><BiRupee/> <div>{courseData.CoursePrice}</div></div>
        </div>
    </div>
  )
}

export default Card