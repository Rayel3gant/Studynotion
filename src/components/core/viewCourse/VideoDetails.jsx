import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../redux/slices/viewCourseSlice';
import { Player } from 'video-react';
import "../viewCourse/video-react.css";
import { MdOutlinePlayArrow ,MdOutlineArrowBackIosNew ,MdOutlineArrowForwardIos } from "react-icons/md";



const VideoDetails = () => {
  const { courseId,  sectionId, subsectionId}=useParams();
  const { courseSectionData,courseEntireData,completedLectures,totalNoOfLectures }=useSelector((state)=>state.viewCourse);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const playerRef=useRef();
  const { token }=useSelector((state)=>state.auth);
  const [videoData,setVideoData]=useState([]);
  const [videoEndStatus,setVideoEndStatus]=useState(false);
  const [loading,setLoading]=useState(false);
  const location=useLocation();


  const checkForFirstVideo=()=>{
    const currentSectionIndex=courseSectionData.findIndex(
      (section)=>section._id === sectionId
    )

    const currentSubSectionIndex=courseSectionData?.[currentSectionIndex]?.SubSection.findIndex(
      (subsection)=>subsection._id === subsectionId
    )

    if( currentSectionIndex === 0 && currentSubSectionIndex ===0)
      return true;
    else return false;
  }
  const checkForLastVideo=()=>{

    const currentSectionIndex=courseSectionData.findIndex(
      (section)=>section._id === sectionId
    )

    const subsectionLength=courseSectionData[currentSectionIndex].SubSection?.length

    const currentSubSectionIndex=courseSectionData?.[currentSectionIndex]?.SubSection.findIndex(
      (subsection)=>subsection._id === subsectionId
    )

    if( currentSectionIndex === courseSectionData.length -1 &&  currentSubSectionIndex === subsectionLength-1)
      return true;
    else return false;

  }

  const gotoNextVideo=()=>{

    const currentSectionIndex=courseSectionData.findIndex(
      (section)=>section._id === sectionId
    )

    const currentSubSectionIndex=courseSectionData?.[currentSectionIndex]?.SubSection.findIndex(
      (subsection)=>subsection._id === subsectionId
    )

    //if current video is not the last in its section
    let nextLectureId;
    if( currentSubSectionIndex !== courseSectionData?.[currentSectionIndex]?.length -1){
      nextLectureId=courseSectionData[currentSectionIndex].SubSection[currentSubSectionIndex +1]._id;
      navigate(`/viewCourse/${courseId}/section/${sectionId}/subsectionId/${nextLectureId}`);
    }
    // if it is the last video in the section , go to next section if it exists
    else {
      //if current section is not the last section
      if(currentSectionIndex !== courseSectionData.length -1){
        nextLectureId=courseSectionData[currentSectionIndex +1].SubSection[0]._id;
        navigate(`/viewCourse/${courseId}/section/${courseSectionData[currentSectionIndex +1]._id}/subsectionId/${nextLectureId}`);
      }
      // if current section is the last section
      else{
        console.log("no more lectures left")
      }
    }

  }

  const gotoPreviousVideo=()=>{

    const currentSectionIndex=courseSectionData.findIndex(
      (section)=>section._id === sectionId
    )

    const currentSubSectionIndex=courseSectionData?.[currentSectionIndex]?.SubSection.findIndex(
      (subsection)=>subsection._id === subsectionId
    )
    
    let prevLectureId;
    // if previous video exists in same section
    if(currentSubSectionIndex !== 0){
      prevLectureId=courseSectionData[currentSectionIndex].SubSection[currentSubSectionIndex-1]._id;
      navigate(`/viewCourse/${courseId}/section/${sectionId}/subsectionId/${prevLectureId}`);        
    }
    // if no more previous videos in same section , go to previous section
    else {
      if(currentSectionIndex !== 0){
        prevLectureId=courseSectionData[currentSectionIndex-1].SubSection[courseSectionData[currentSectionIndex-1].length -1]._id;
        navigate(`/viewCourse/${courseId}/section/${courseSectionData[currentSectionIndex -1]._id}/subsectionId/${prevLectureId}`);

      }
      else{
        console.log("no more lectures left")
      }
    }

  }

  const handleLectureComplete=async()=>{
    setLoading(true);
    console.log(courseId)
    const result=await markLectureAsComplete({
      courseId:courseId,
      subsectionId:subsectionId
    },token);
    if(result){
      dispatch(updateCompletedLectures(subsectionId))
    }
    setLoading(false)
  }

  const setVideoDetails=async()=>{
    if( ! courseSectionData?.length){
      return;
    }
    if( !courseId && ! sectionId && !subsectionId){
      navigate("/dashboard/enrolledCourses");
    }
    // find the corressponding video from the sectionId and subsectionId given in URL

    const filteredSection=courseSectionData.filter(
      (section)=>section._id === sectionId
    )

    const filteredSubsection=filteredSection?.[0]?.SubSection.filter(
      (subsection)=>subsection._id === subsectionId
    )

    setVideoData(filteredSubsection?.[0]);
    setVideoEndStatus(false)
  }

  useEffect(()=>{
    setVideoDetails();
  },[courseSectionData, courseEntireData, location.pathname]);

  const videoRewatchHandler=()=>{
    if(playerRef?.current){
      playerRef.current.seek(0);
      playerRef.current.play();
      setVideoEndStatus(false);
    }
  }
  return (
    <div className='flex flex-col gap-5 text-white p-5'>
      {
        ! videoData ? (<div>No video Found</div>) : (
          <div>
            <Player ref={playerRef} aspectRatio="16:9"  playsInline onEnded={()=>setVideoEndStatus(true)} src={videoData.VideoURL} autoPlay={true}>
              <MdOutlinePlayArrow position="center"/>
              {
                videoEndStatus &&
                (
                  <div style={{backgroundImage:"linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",}}
                        className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter">
                    {
                      ! completedLectures?.includes(subsectionId) && (
                        <button className='py-2 bg-yellow-50 text-xl text-richblack-900 max-w-max px-4' onClick={()=>handleLectureComplete()}>Mark as completed</button>
                      )
                    }
                    <button className='text-xl max-w-max px-4 mx-auto mt-2' onClick={()=>videoRewatchHandler()}>Rewatch</button>

                    <div className='mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl'>
                      {
                        !checkForFirstVideo() && (<button className='px-3 py-2 bg-yellow-50 text-xl text-richblack-900' onClick={()=>gotoPreviousVideo()}><MdOutlineArrowBackIosNew/></button>)
                      }

                      {
                        ! checkForLastVideo() && (<button className='px-3 py-2 bg-yellow-50 text-xl text-richblack-900' onClick={()=>gotoNextVideo()}><MdOutlineArrowForwardIos/></button>)
                      }
                    </div>
                  </div>
                )
              }        
            </Player>

            <div className='mt-4 text-3xl font-semibold'>{videoData.SubSectionName}</div>
            <div className='pt-2 pb-6'>{videoData.Description}</div>
          </div>

        )
      }
    </div>
  )
}

export default VideoDetails