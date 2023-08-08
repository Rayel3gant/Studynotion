import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../redux/slices/courseSlice';
import { RiCloseLine } from "react-icons/ri"
import Upload from '../Upload';
import ModalButton from '../../../../common/ModalButton';

export default function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm()

  // console.log("view", view)
  // console.log("edit", edit)
  // console.log("add", add)

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

 useEffect( ()=>{
    console.log(modalData)
    if(view || edit){
      setValue("lectureTitle",modalData.title);
      setValue("lectureDescription",modalData.description);
      setValue("lectureVideo",modalData.videoURL);
    }
  },[]);

  // detect whether form is updated or not
  const isFormUpdated=()=>{
    const currentValues=getValues();
    if(currentValues.lectureTitle !== modalData.title || currentValues.lectureDescription !== modalData.description || currentValues.lectureVideo !== modalData.videoURL ){
      return true;
    }
    else return false;
  }

  // handle the editing of subsection
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
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RiCloseLine className="text-2xl text-richblack-5" />
          </button>
        </div>
        {/* Modal Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 px-8 py-10"
        >
          {/* Lecture Video Upload */}
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />
          {/* Lecture Title */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
              Lecture Title {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <input
              disabled={view || loading}
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="form-style w-full"
            />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture title is required
              </span>
            )}
          </div>
          {/* Lecture Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureDescription">
              Lecture Description{" "}
              {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <textarea
              disabled={view || loading}
              id="lectureDescription"
              placeholder="Enter Lecture Description"
              {...register("lectureDescription", { required: true })}
              className="form-style resize-x-none min-h-[130px] w-full"
            />
            {errors.lectureDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Description is required
              </span>
            )}
          </div>
          {!view && (
            <div className="flex justify-end">
              <IconBtn
                disabled={loading}
                text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}