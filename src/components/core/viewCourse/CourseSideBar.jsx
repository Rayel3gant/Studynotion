import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TiArrowBack } from "react-icons/ti";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md"

const CourseSideBar = (props) => {
    const setReviewModal=props.setReviewModal;
    const [activeSection,setActiveSection]=useState("");
    const [activeVideo,setActiveVideo]=useState("");
    const { sectionId, subsectionId}=useParams();
    const { courseSectionData,courseEntireData,completedLectures,totalNoOfLectures }=useSelector((state)=>state.viewCourse);
    const location=useLocation();
    const navigate=useNavigate();


    const setActiveFlags=()=>{
        if(! courseSectionData?.length) {
            return;
        }

        const currentSectionIndex=courseSectionData.findIndex(
            (data)=>data?._id === sectionId
        )

        const currentSubSectionIndex= courseSectionData?.[currentSectionIndex]?.SubSection.findIndex(
            (data)=> data?._id=== subsectionId
        )

        const activeSubSectionId=courseSectionData?.[currentSectionIndex]?.SubSection?.[currentSubSectionIndex]?._id ;
        setActiveSection(courseSectionData?.[currentSectionIndex]?._id);
        setActiveVideo(activeSubSectionId);
    }
    useEffect(()=>{
        setActiveFlags();
    },[courseSectionData, courseEntireData, location.pathname])


    const showLectureVideo=(courseId,sectionId,subsectionId)=>{
        navigate(`viewCourse/${courseId}/section/${sectionId}/subsectionId/${subsectionId}`);
        setActiveVideo(subsectionId)
    }

  return (
    <div className='flex h-[calc(100vh-3.5rem)] lg:w-[320px] w-[200px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800'>
        <div className='mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25'>
            <div className='flex w-full items-center justify-between'>
                <div className='text-3xl' onClick={()=>navigate("/dashboard/enrolledCourses")}><TiArrowBack/></div>
                <button className='px-3 py-2 rounded-md bg-yellow-50' onClick={()=>setReviewModal(true)}>Add Review</button>
            </div>

            <div className='flex flex-col'>
                <div>{courseEntireData?.courseDetails?.CourseTitle}</div>
                <div className='text-sm font-semibold text-richblack-500'>{completedLectures?.length}/{totalNoOfLectures}</div>
            </div>


        </div>

        <div className='h-[calc(100vh - 5rem)] overflow-y-auto'>
            {
                courseSectionData?.map((section,index)=>(
                    <div key={index} onClick={()=>setActiveSection(section._id)} className='mt-2 cursor-pointer text-sm text-richblack-5'>
                        <div className='flex flex-row justify-between bg-richblack-600 px-5 py-4'>
                            <div className='w-[70%] font-semibold'>{section.SectionName}</div>
                            <MdOutlineKeyboardArrowDown/>
                        </div>

                        <div className=''>
                            {
                                activeSection === section._id && (
                                    <div className='transition-[height] duration-500 ease-in-out'>
                                        {
                                            section.SubSection.map((subsection,index)=>(
                                                <div className={`flex gap-x-3 items-center ${subsection._id === activeVideo  ? ("bg-yellow-50 text-richblack-900"):("bg-richblack-900 text-richblack-5")}`}
                                                    onClick={()=>showLectureVideo(courseEntireData?._id,section._id,subsection._id)}>
                                                    <input type='checkbox' checked={completedLectures?.includes(subsection._id)} onChange={()=>{}}/>
                                                    <div>{subsection.SubSectionName}</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default CourseSideBar