import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../redux/slices/courseSlice';
import { RiCloseLine } from "react-icons/ri"
import Upload from '../Upload';
import ModalButton from '../../../../common/ModalButton';

const SubSectionModal = ({modalData , setModalData, add=false, view=false, edit=false}) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState:{errors}
  } =useForm();

  const dispatch=useDispatch();
  const [loading , setLoading]=useState(false);
  const { course }=useSelector( (state)=>state.course);
  const { token} =useSelector((state)=>state.auth);

  useEffect( ()=>{
     console.log("modal data",modalData)
    // console.log(view)
    // console.log(edit)
    if(view || edit){
      setValue("lectureTitle",modalData.SubSectionName);
      setValue("lectureDescription",modalData.Description);
      setValue("lectureVideo",modalData.VideoURL);
    }
  },[]);

  const isFormUpdated=()=>{
    const currentValues=getValues();
    if(currentValues.lectureTitle !== modalData.title || currentValues.lectureDescription !== modalData.description || currentValues.lectureVideo !== modalData.videoURL ){
      return true;
    }
    else return false;
  }
  
  const handleEditSubSection=async()=>{
    const currentValues=getValues();
    const formData=new FormData();

    formData.append("sectionId",modalData.sectionId);
    formData.append("subsectionId",modalData._id);

    if(currentValues.lectureTitle !==modalData.title){
      formData.append("title",currentValues.lectureTitle)
    }

    if(currentValues.lectureDescription !== modalData.description){
      formData.append("description",currentValues.lectureDescription)
    }

    if(currentValues.lectureVideo !== modalData.videoURL){
      formData.append("videoURL",currentValues.lectureVideo)
    }

    

    setLoading(true);
    const result=await updateSubSection(formData,token);
    if(result){
      const updatedCourseContent=course.CourseContent.map((section)=> section._id === modalData.sectionId  ? result : section);
      const updatedCourseData={...course,CourseContent:updatedCourseContent}
      dispatch(setCourse(updatedCourseData))
    }
    setModalData(null);
    setLoading(false);
  }



  const submitHandler=async(data)=>{
    console.log(data)
    if(view){
      return;
    }
    if(edit){
      if(! isFormUpdated){
        console.log("no changes made")
      }
      else {
        handleEditSubSection();
      }
      return;
    }

    const formData1=new FormData();
    formData1.append("sectionId",modalData);
    formData1.append("title",data.lectureTitle);
    formData1.append("description",data.lectureDescription);
    formData1.append("video",data.lectureVideo);
    formData1.append("courseId",course._id);


    setLoading(true);
    const result=await createSubSection(formData1,token);
    if(result){
      // const updatedCourseContent = course.CourseContent.map((section) => section._id === modalData ? result : section)
      // const updatedCourse = { ...course, courseContent: updatedCourseContent }
      // console.log("updated course",updatedCourse)
      dispatch(setCourse(result))
    }
    setModalData(null);
    setLoading(false);
  }
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className='bg-richblack-400 px-12 py-3 rounded-md'>
        <div className='flex justify-between'>
          <div>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</div>
          <button onClick={ () => (!loading ? setModalData(null) : {})}><RiCloseLine/></button>
        </div>

        <form onSubmit={handleSubmit(submitHandler)}>
          <Upload
            name="lectureVideo"           
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={ view ? modalData.VideoURL :null}
            editData={ edit ? modalData.VideoURL : null}
          />
          
          <div className='flex flex-col gap-x-1'>
            <label htmlFor='lectureTitle'>Lecture Title <sup className='requiredValue'>*</sup></label>
            <input id='lectureTitle' name='lectureTitle' className='' disabled={view || loading} placeholder='Enter lecture title' {...register("lectureTitle",{required:true})}></input>
            {
              errors.lectureTitle && <span>Please enter lecture title</span>
            }
          </div>

          <div className='flex flex-col gap-x-1 mb-6'>
            <label htmlFor='lectureDescription'>Lecture Description <sup className='requiredValue'>*</sup></label>
            <textarea id='lectureDescription' name='lectureDescription' disabled={view || loading} className='min-h-[130px]' placeholder='Enter lecture description' {...register("lectureDescription",{required:true})}></textarea>
            {
              errors.lectureDescription && <span>Please enter lecture description</span>
            }
          </div>

          {/* <ModalButton text={loading ? "Loading.." : edit ? "Save Changes" : "Save"} type={"submit"} disabled={"loading"}/> */}
          {
             ! view && (
              
              <button className='px-5 py-3 rounded-md bg-yellow-50' type='submit'>{loading ? "Loading.." : edit ? "Save Changes" : "Create"}</button>
              
             )
          }
        </form>
      </div>
    </div>
  )
}

export default SubSectionModal

