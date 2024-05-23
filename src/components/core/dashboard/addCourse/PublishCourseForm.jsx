import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import ModalButton from '../../../common/ModalButton';
import { resetCourseState, setStep } from '../../../../redux/slices/courseSlice';
import { useEffect } from 'react';
import { COURSE_STATUS } from "../../../../utils/Constant"
import { editCourseDetails } from '../../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';

const PublishCourseForm = () => {

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState:{errors}
  }=useForm();
  const dispatch=useDispatch();
  const { course }=useSelector((state)=>state.course);
  const { token } =useSelector((state)=>state.auth);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate()

  useEffect( ()=>{
    if(course.Status === COURSE_STATUS.PUBLISHED){
      setValue("public",true)
    }
  })
  const gotoCourses=()=>{
    dispatch(resetCourseState());
    navigate("/dashboard/myCourses")
  }

  const handleCoursePublish=async()=>{
    if( course.Status === COURSE_STATUS.PUBLISHED && getValues('public') === true ||
    course.Status === COURSE_STATUS.DRAFT && getValues('public')=== false){
      // no updation in form , no need to call api
      gotoCourses();
      return;
    }

    //if form is updated
    const formData=new FormData();
    formData.append('courseID',course._id);
    const courseStatus= getValues('public') ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
    formData.append('Status',courseStatus);
    setLoading(true);
    const result=await editCourseDetails (formData , token); 
    if(result){
      console.log(result)
      gotoCourses();
    }
    setLoading(false)
  }

  const submitHandler=()=>{
    handleCoursePublish();
  }
  const goBack=()=>{
    dispatch(setStep(2));
  }

  return (
    <div className='px-4 py-5 bg-richblack-800 rounded-md'>
      <div className='text-2xl text-richblack-5'>Publish Course</div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className='flex gap-x-3 items-center mt-4'>
          <label htmlFor='public'>Make this course as public</label>
          <input type='checkbox' id='public' {...register('public')} className=''/>
        </div>

        <div className='flex gap-x-5 mt-5'>
          <button onClick={()=>goBack}>Back</button>
          {/* <ModalButton type={"submit"} text={"save change"}/> */}
          <button className='px-4 py-3 bg-yellow-50 rounded-md' type='submit'>Save change</button>
        </div>
      </form>
    </div>
  )
}

export default PublishCourseForm