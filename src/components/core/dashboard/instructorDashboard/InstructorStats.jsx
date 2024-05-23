import React from 'react'
import { useState } from 'react'
import { fetchInstructorStats } from '../../../../services/operations/profileAPI';
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { useEffect } from 'react';
import Loader from '../../../common/Loader';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';
import { BsCurrencyRupee  } from "react-icons/bs"

const InstructorStats = () => {
    const [loading,setLoading]=useState(false);
    const [instructorData,setInstructorData]=useState(null);
    const [courseData,setCourseData]=useState([]);
    const { token} =useSelector((state)=>state.auth);
    const { user }=useSelector((state)=>state.profile)

    const fetchData=async()=>{
        setLoading(true)
        try{
            const res1=await fetchInstructorStats(token);
            const res2=await fetchInstructorCourses(token)
            console.log("instructor data",res1);
            console.log("instructor courses",res2);
            setInstructorData(res1.data);
            setCourseData(res2);
        } catch(error){
            console.error(error)
        }
        setLoading(false)
    }
    useEffect(()=>{
        fetchData()
    },[]);

    const totalAmount=instructorData?.reduce((acc,curr)=> acc + curr.totalIncome, 0);
    const totalStudents=instructorData?.reduce((acc,curr)=>acc + curr.totalStudentsEnrolled,0);


  return (
    <div>
        <div className='px-8'>
            <div className='text-2xl text-richblack-5'> Hi {user.FirstName} </div>
            <div className='text-sm text-richblack-200'>Let's start something new !!!</div>
        </div>

        {
            loading ? (<Loader/>) : courseData.length>0 ?(
                <div className='flex flex-col gap-y-5 px-8'>

                    <div className='flex w-full flex-col lg:flex-row gap-16 '>
                        <div className='w-full lg:w-1/2 bg-richblack-800 px-5 py-10 rounded-md'>
                            <InstructorChart data={instructorData}/>
                        </div>

                        <div className='flex flex-col gap-y-2 w-full lg:w-[30%] bg-richblack-800 h-fit px-5 py-10 rounded-md'>
                            <div className='text-2xl text-richblack-5 font-semibold'>Statistics</div>
                            <div className='w-full h-[2px] bg-richblack-500'></div>
                            <div>
                                <div className='text-lg text-richblack-50'>Total Courses</div>
                                <div className='text-sm text-richblack-300'>{courseData.length}</div>
                            </div>

                            <div>
                                <div className='text-lg text-richblack-50'>Total Students</div>
                                <div className='text-sm text-richblack-300'>{totalStudents}</div>
                            </div>

                            <div>
                                <div className='text-lg text-richblack-50'>Total Earnings</div>                               
                                <div className='flex items-center gap-x-1 text-sm text-richblack-300'><BsCurrencyRupee/>  {totalAmount}</div>
                            </div>
                        </div>
                    </div>




                    <div className='flex flex-col gap-y-5 bg-richblack-800 px-4 py-5 rounded-md'>
                        <div className='flex w-full justify-between text-lg'>
                            <div className=' text-richblack-50'>Your Courses</div>
                            <Link  to="/dashboard/myCourses" className='text-yellow-50'>View All</Link>
                        </div>

                        <div className='w-full flex flex-wrap gap-8 place-content-center'>
                            {
                                courseData.slice(0,3).map((course)=>(
                                    <div>
                                        <img src={course.Thumbnail} className='w-[300px] h-[200px] rounded-md'/>
                                        <div className='mt-2 text-lg text-richblack-5'>{course.CourseTitle}</div>
                                        <div className='flex gap-x-1 text-richblack-100'>
                                            <div>{course.EnrolledStudents.length} Students</div>
                                            <div>|</div>
                                            <div className='flex items-center'>
                                                <BsCurrencyRupee/> 
                                                <div>{course.CoursePrice}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

            ) : (
                <div>
                    <div>You have not published any courses yet</div>
                    <Link to="/dashboard/addCourse">Create</Link>
                </div>)
        }

        <div>

        </div>


    </div>
  )
}

export default InstructorStats