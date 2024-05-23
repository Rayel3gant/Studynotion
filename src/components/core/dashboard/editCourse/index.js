import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import UploadForm from '../addCourse/UploadForm';
import { useEffect } from 'react';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../redux/slices/courseSlice';

export default function EditCourse (){
    const dispatch=useDispatch();
    const { courseId }=useParams();
    const { course }=useSelector((state)=>state.course);
    const [loading ,setLoading]=useState(false);
    const { token } =useSelector((state)=>state.auth);

    const populateCourseDetails=async()=>{
        setLoading(true)
        try{
            const result=await getFullDetailsOfCourse(courseId, token);
            console.log(result)
            if(result){
                dispatch(setCourse(result.courseDetails));
                dispatch(setEditCourse(true));
            }
        } catch(error){
            console.error(error)
        }
        setLoading(false)
    }

    useEffect( ()=>{
        populateCourseDetails();
    },[])
    return (
       <div>
        <div className='text-2xl text-richblack-5 mb-2'>Edit Course</div>
        <div>
            {
                course ? (<UploadForm/>) : (<div>Course not found</div>)
            }
        </div>
       </div>

    )
}