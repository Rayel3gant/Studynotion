import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ModalButton from '../../../../common/ModalButton';
import { MdOutlineAddCircleOutline } from "react-icons/md"
import NestedView from './NestedView';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineNavigateNext } from "react-icons/md"
import { setCourse, setEditCourse, setStep } from '../../../../../redux/slices/courseSlice';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';

const CourseBuilderForm = () => {
  const { register , handleSubmit ,setValue , formState:{errors}} =useForm();
  const [editSectionName, setEditSectionName]=useState(false);
  const { course  } =useSelector( (state) => state.course);
  const dispatch=useDispatch();
  const [loading , setLoading]=useState(false);
  const  { token }=useSelector( (state)=>state.auth);

 


  const cancelEditHandler=()=>{
    setEditSectionName(null);
    setValue("sectionName","")
  }
  const backHandler=()=>{
    // we are going to edit the data we entered while creating the same course , hence set the editCourse state variable to true
  dispatch(setStep(1));
  dispatch(setEditCourse(true))



  }
  const gotoNext=()=>{
    if(course?.CourseContent?.length === 0){
      console.log("please add atleast one section");
      return;
    }
    if(course?.CourseContent .some((section) => section?.CourseSubSection?.length===0)){
      console.log("please add atleast one lecture in each section")
      return;
    }

    dispatch(setStep(3));
    
  }

  const submitHandler=async(data)=>{
    console.log("submit handler running")
    setLoading(true);
    let result;

    if(editSectionName){          //we are editing the section name , calling edit API
      
      
      result=await updateSection(
        {
          newSectionName:data.sectionName,
          sectionID:editSectionName,
          courseId:course._id
        }, token
      )
    }
    else{                         // we are creating the section
      result=await createSection(
        {
          SectionName:data.sectionName,
          courseID:course._id
        },token
      )
    }
    console.log("section creation / updation  result",result)

    if(result){
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName","");
    }

    setLoading(false);

    console.log( "CourseContent",course?.CourseContent.length);
    console.log("course content",course?.CourseContent)
    console.log("course",course)

  }


  const handleChangeEditSectionName=(sectionId , sectionName)=>{
    if(editSectionName===sectionId){
      cancelEditHandler();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName",sectionName)
  }
  return (
    <div className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
      <div>Course Builder</div>

      <form onSubmit={handleSubmit(submitHandler)}  className='w-full bg-richblack-800 px-4 py-5 rounded-md flex flex-col gap-y-4'>

        <div className='flex flex-col gap-y-1'>
          <label htmlFor='sectionName' className='text-sm text-richblack-5'>Course Section <sup className='requiredValue '>*</sup></label>
          <input type='text' className='rounded-md bg-richblack-700 p-3' id='sectionName' placeholder='add a section to course' {...register("sectionName",{required:true})}></input>
          {
            errors.sectionName && (<span>Please provide section name</span>)
          }
        </div>

      <div className='flex gap-x-2'>
        <ModalButton customClasses={"text-richblack-5"} type="submit" text={(editSectionName) ? "Edit Section Name": "Create Section" } outline={true}>
          <MdOutlineAddCircleOutline className='text-yellow-5 text-2xl'/>
        </ModalButton>


        {
          editSectionName && (
            <button type='button' onClick={cancelEditHandler} className='text-sm text-richblack-300 underline'>cancel edit</button>
          )
        }
      </div>
      </form>
      {
        
        course?.CourseContent?.length > 0 && (
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
        )
      }

      <div className='flex gap-x-4'>
        <button className='px-5 py-3 bg-richblack-5 rounded-md border-blue-25' onClick={backHandler}>Back</button>
        {/* <ModalButton text={"Next"} onClick={gotoNext}>
          <MdOutlineNavigateNext/>
        </ModalButton> */}

        <button onClick={gotoNext} className='px-5 py-3 rounded-md bg-yellow-50'>
          <div className='flex gap-x-1 items-center'>
            <div>Next</div>
            <MdOutlineNavigateNext/>
          </div>
        </button>
      </div>
    </div>
  )
}

export default CourseBuilderForm