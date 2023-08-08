import React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdClose } from "react-icons/md"
import { useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { createRating } from '../../../services/operations/courseDetailsAPI';
const RatingModal = (props) => {
  const setReviewModal=props.setReviewModal;
  const { user }=useSelector((state)=>state.profile);
  const { token } =useSelector((state)=>state.auth);
  const { courseEntireData }=useSelector((state)=>state.viewCourse)
  const { 
    register,
    handleSubmit,
    setValue,
    formState:{errors}
  }=useForm();

  useEffect(()=>{
    setValue("courseReview","");
    setValue("courseRating",0)
  },[]);

  const submitHandler=async(data)=>{
    console.log(data)
    console.log("course id:",courseEntireData.courseDetails._id)
    const result=await createRating({
      courseID:courseEntireData.courseDetails._id,
      Rating:data.courseRating,
      Review:data.courseReview
    }, token);
    
    console.log("create rating result",result);
    setReviewModal(false)
  }

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setValue("courseRating",newRating)
  };
   


  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className='w-11/12 max-w-[350px] flex flex-col gap-y-4 py-6 px-5 bg-richblack-800 rounded-md'>

        <div className='flex w-full justify-between items-center text-richblack-5'>
          <div className='text-xl '>Add Review</div>
          <div onClick={()=>setReviewModal(false)}><MdClose/></div>
        </div>

        <div className='w-full h-[1px] bg-richblack-5'></div>

        <div className='flex gap-x-2 place-content-center items-center'>
          <img src={user.Image} alt='' className='w-[70px] h-[70px] rounded-full'/>
          <div className='flex flex-col text-richblack-5 '>
            <div className='text-xl'>{user.FirstName} {user.LastName}</div>
            <div className='text-sm'>Posting Publicly</div>
          </div>
        </div> 

        <form onSubmit={handleSubmit(submitHandler)} className='w-[75%] mx-auto flex flex-col gap-y-3 items-center'>

          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"   
          />

          <div className='w-full'>
            <label htmlFor='courseReview' className='text-sm text-richblack-5'>Add Your Experience<sup className='requiredValue'>*</sup></label>
            <textarea className='min-h-[150px] w-full my-2 bg-richblack-300 text-richblack-5 text-sm px-3 py-2' id='courseReview' placeholder='Add your experience here' {...register("courseReview",{required:true})} />
            { errors.courseReview && (<span>Please add your review</span>)}
          </div>

          <button type='submit' className='px-3 py-2 rounded-md bg-yellow-50'>Save</button>


        </form>
        
      </div>
    </div>
  )
}

export default RatingModal