import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import ModalButton from '../../common/ModalButton';
import CourseTable from './instructorCourses/CourseTable';
import { GrFormAdd } from "react-icons/gr"

const MyCourses = () => {
    const { token } =useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const [courses,setCourses]=useState([]);

    const getInstructorCourses=async(token)=>{
        try{
            const result=await fetchInstructorCourses(token);
            if(result){
                console.log("instructor course are",result)
                setCourses(result)
            }
        } catch(error){
            console.error(error)
        }
    }
    
    useEffect( ()=>{
        getInstructorCourses(token);
    },[])
  return (
    <div >
        <div className='flex justify-between pb-8 items-center'>
            <div className='text-2xl text-richblack-5 font-bold'>My Courses</div>
            <ModalButton text="Add Course" onclick={()=>navigate("/dashboard/addCourse")}>{GrFormAdd}</ModalButton>
        </div>
        {
            courses && <CourseTable courses={courses} setCourses={setCourses} />
        }
    </div>
  )
}

export default MyCourses