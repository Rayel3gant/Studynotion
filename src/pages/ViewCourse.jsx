import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom';
import RatingModal from '../components/core/viewCourse/RatingModal';
import { useDispatch, useSelector } from 'react-redux';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../redux/slices/viewCourseSlice';
import CourseSideBar from '../components/core/viewCourse/CourseSideBar';

const ViewCourse = () => {
    const [reviewModal,setReviewModal]=useState(false);
    const { courseId }=useParams();
    const { token }=useSelector((state)=>state.auth);
    const dispatch=useDispatch();


    const getCourseData=async()=>{
        try{
            const result=await getFullDetailsOfCourse(courseId,token);
            console.log("course data:",result.courseDetails)
            if(result){
                dispatch(setCourseSectionData(result.courseDetails.CourseContent));
                dispatch(setEntireCourseData(result));
                dispatch(setCompletedLectures(result?.completedVideos))
                let lectures=0;
                result.courseDetails.CourseContent?.map((section)=>{
                    lectures+=section.SubSection?.length
                })
                console.log("lectures total:",lectures)
                dispatch(setTotalNoOfLectures(lectures))
            }
        } catch(error){
            console.error(error);
            console.log("error in fetching full course data")
        }
    }
    useEffect(()=>{
        getCourseData();
    },[]);
  return (
    <div>
        <div className='relative flex min-h-[calc(100vh-3.5rem)] w-full'>
            <CourseSideBar setReviewModal={setReviewModal}/>

            <div className="mx-6 h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <Outlet/>
            </div>
        </div>

        { reviewModal && <RatingModal setReviewModal={setReviewModal}/>}
    </div>
  )
}

export default ViewCourse