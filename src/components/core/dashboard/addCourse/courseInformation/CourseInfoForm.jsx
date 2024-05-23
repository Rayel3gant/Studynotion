import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee} from "react-icons/hi"
import RequirementField from './RequirementField';
import ModalButton from "../../../../common/ModalButton";
import { setCourse, setStep } from "../../../../../redux/slices/courseSlice";
import { COURSE_STATUS} from "../../../../../utils/Constant"
import CourseTags from './CourseTags';
import CoursePic from '../CoursePic';
import UploadImage from "../Upload";
import ChipInput from './ChipInput';



const CourseInfoForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors}
    }=useForm();

    const dispatch=useDispatch();
    const { course , editCourse}=useSelector((state)=>state.course);
    const [loading ,setLoading]=useState(false);
    const [courseCategory,setCategory]=useState([]);
    const { token  } =useSelector( (state)=>state.auth)
    
    
    const getCategories=async()=>{
      try{
        setLoading(true);
        const response=await fetchCourseCategories();
        if(response.length>0){
          setCategory(response);
        }
        setLoading(false);
      }
      catch(error){
        console.log(error)
      }
    }
    useEffect( ()=>{
      getCategories();

      if(editCourse){
        setValue("courseTitle",course.CourseTitle);
        setValue("courseDesc",course.CourseDescription);
        setValue("coursePrice",course.CoursePrice);
        setValue("courseTags",course.Tag);
        setValue("courseBenefits",course.Learnings);
        setValue("courseCategory",course.Category);
        setValue("courseInstructions",course.Instructions);
        setValue("courseImage",course.Thumbnail);
      }
    },[]);


    const isFormUpdated=()=>{
      const currentValues=getValues();
      if(
        currentValues.courseTitle !== course.CourseTitle||
        currentValues.courseDesc !== course.CourseDescription ||
        currentValues.coursePrice !== course.CoursePrice ||
        currentValues.courseTags.toString() !== course.Tag.toString() ||
        currentValues.courseBenefits !== course.Learnings ||
        currentValues.courseCategory._id !== course.Category._id ||
        currentValues.courseImage !== course.Thumbnail ||
        currentValues.courseInstructions.toString() !== course.Instructions.toString() ){
          return true;
        }
      else return false;
    }


    const submitHandler= async(data)=>{
      
      console.log("data",data);
      console.log("inside submit handler!!")
      if(editCourse){
        //if user is editing the course details
        if(isFormUpdated()){
          const currentValues=getValues();
          const formData=new FormData();
          formData.append("courseID",course._id)
          if(currentValues.courseTitle !==course.CourseTitle){
            formData.append("CourseTitle",data.courseTitle);
          }

          if(currentValues.courseDesc !==course.CourseDescription){
            formData.append("CourseDescription",data.courseDesc);
          }

          if(currentValues.coursePrice !==course.CoursePrice){
            formData.append("CoursePrice",data.coursePrice);
          }


          if(currentValues.courseBenefits !==course.Learnings){
            formData.append("Learnings",data.courseBenefits);
          }

          if(currentValues.courseCategory._id !==course.Category._id){
            formData.append("Category",data.courseCategory);
          }

          if(currentValues.courseInstructions.toString() !==course.Instructions.toString()){
            formData.append("Instructions",JSON.stringify(data.courseInstructions));
          }
          if(currentValues.courseTags.toString() !== course.Tag.toString()){
            formData.append("Tag",JSON.stringify(data.courseTags))
          }

          if(currentValues.courseImage !== course.Thumbnail){
            formData.append("Thumbnail",data.courseImage)
          }

          setLoading(true);
          const response= await editCourseDetails(formData,token);
          setLoading(false);
          if(response){
            dispatch(setStep(2));
            dispatch(setCourse(response))
          }
        }
        else{
          console.log("no changes made to form data")
        }
        return;
      }
      //if user is entering the course details first time

      const formData=new FormData();
      formData.append("CourseTitle",data.courseTitle);
      formData.append("CourseDescription",data.courseDesc);
      formData.append("CoursePrice",data.coursePrice);
      formData.append("Learnings",data.courseBenefits);
      formData.append("Category",data.courseCategory);
      formData.append("Instructions",JSON.stringify(data.courseInstructions));
      formData.append("Status",COURSE_STATUS.DRAFT);
      formData.append("Tag",JSON.stringify(data.courseTags));
      formData.append("Thumbnail",data.courseImage);
      
      console.log("course title:",data.courseTitle);
      console.log("course description:",data.courseDesc);
      console.log("course price",data.coursePrice);
      console.log("Learnings:",data.courseBenefits);
      console.log("Category:",data.courseCategory);
      console.log("Instructions:",JSON.stringify(data.courseInstructions));
      console.log("Status:",COURSE_STATUS.DRAFT);
      console.log("Tag:",JSON.stringify(data.courseTags));
      console.log("Thumbnail:",data.courseImage);


      const courseData={
        CourseTitle:data.courseTitle,
        CourseDescription:data.courseDesc,
        CoursePrice:data.coursePrice,
        Learnings:data.courseBenefits,
        Category:data.courseCategory,
        Instructions:JSON.stringify(data.courseInstructions),
        Status:COURSE_STATUS.DRAFT,
        Tag:JSON.stringify(data.courseTags),
        Thumbnail:data.courseImage
      }


      console.log("create course data:",courseData)
      setLoading(true);
      const response=await addCourseDetails(courseData,token);
      if(response){
        dispatch(setStep(2))
        dispatch(setCourse(response))
      }
      setLoading(false);
      

    }
  return (
    <form onSubmit={handleSubmit(submitHandler)} className='w-full bg-richblack-800 px-4 py-5 rounded-md flex flex-col gap-y-4'>
      <div className='flex flex-col gap-y-1'>
        <label htmlFor='courseTitle' className='text-sm text-richblack-5'>Course Title <sup className='requiredValue '>*</sup></label>
        <input type='text' className='rounded-md bg-richblack-700 p-3' id='courseTitle' name='courseTitle' placeholder='Enter Course Title' {...register("courseTitle",{required:true})}></input>
        {
          errors.courseTitle && (<span>Please provide valid course title</span>)
        }
      </div>

      <div className='flex flex-col gap-y-1'>
        <label htmlFor='courseDesc' className='text-sm text-richblack-5'>Course Short Description <sup className='requiredValue'>*</sup></label>
        <textarea className=' min-h-[130px]rounded-md bg-richblack-700 p-3' placeholder='Enter course description' name='courseDesc' id='courseDesc'{...register("courseDesc",{required:true})}></textarea>
        {
          errors.courseDesc && (<span>Course description is required</span>)
        }
      </div>

      <div className='flex flex-col gap-y-1 relative'>
        <label htmlFor='coursePrice' className='text-sm text-richblack-5'>Price <sup className='requiredValue'>*</sup></label>
        <input id='coursePrice' name='coursePrice' className=' rounded-md bg-richblack-700 p-3' placeholder='Enter course price' {...register("coursePrice",{required:true,valueAsNumber:true})}></input>
        <HiOutlineCurrencyRupee className='absolute right-2 top-8 z-10 text-3xl pb-[2px] pr-[1px] text-richblack-500' />
        {
          errors.coursePrice && (<span>Please provide course price</span>)
        }
      </div>

      <div className='flex flex-col gap-y-1'>
        <label htmlFor='courseCategory' className='text-sm text-richblack-5'>Course Category <sup className='requiredValue'>*</sup></label>
        <select className='rounded-md bg-richblack-700 p-3' id='courseCategory' name='courseCategory' defaultValue="" {...register("courseCategory",{required:true})}>
          <option value="" disabled>Choose a Category</option>
          {
            !loading && courseCategory.map((data,index)=>{
              return(
                <option key={index} value={data._id}>{data.Category}</option>
              )
            })
          }
        </select>
        {
          errors.courseCategory && (<span>Select course Category</span>)
        }
      </div>

      {/* <CourseTags className=' rounded-md bg-richblack-700 p-3' id="courseTags" name="courseTags" errors={errors} label="Tags" register={register} setValue={setValue} getValues={getValues}/> */}
      
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      <UploadImage name="courseImage" id="courseImage" errors={errors} label="Course Thumbnail" register={register} setValue={setValue} getValues={getValues}/>

      {/* create componment for uploading image */}

      <div className='flex flex-col gap-y-1'>
        <label htmlFor='courseBenefits' className='text-sm text-richblack-5'>Course Benefits <sup className='requiredValue'>*</sup></label>
        <textarea  className='min-h-[130px] rounded-md bg-richblack-700 p-3' placeholder='Enter course learnings' name='courseBenefits' id='courseBenefits' {...register("courseBenefits",{required:true})}></textarea>
        {
          errors.courseBenefits && (<span>Course benefits is required</span>)
        }
      </div>

      <RequirementField name="courseInstructions" errors={errors} label="Course Instructions" register={register} setValue={setValue} getValues={getValues}/>
      
      <div>
        {
          editCourse && <button onClick={()=> dispatch(setStep(2))} className=''>
            Continue without saving
          </button>
        }

        {/* <ModalButton type="submit" text={ ! editCourse ? "Next" : "Save changes"} onClick={submitHandler}/> */}
        <button type='submit' className='mt-3 rounded-md bg-[#FFD60A] w-fit py-3 px-5'>{ ! editCourse ? "Next" : "Save changes"}</button>

      </div>

    </form>

  )
}

export default CourseInfoForm