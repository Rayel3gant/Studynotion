import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { MdArrowDropDown} from "react-icons/md";
import { RxDropdownMenu } from "react-icons/rx";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiVideoAddFill } from "react-icons/ri"
import SubSectionModal from './SubSectionModal';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../redux/slices/courseSlice';
import { useEffect } from 'react';

const NestedView = (props) => {
  const handleChangeEditSectionName = props.handleChangeEditSectionName;
  const { course }=useSelector((state)=>state.course);
  const { token }=useSelector((state)=>state.auth);
  
  const dispatch=useDispatch();
  const [addSubSection,setAddSubSection]=useState(false);
  const [editSubSection,setEditSubSection]=useState(false);
  const [viewSubSection,setViewSubSection]=useState(false);
  const [confirmationModalData,setConformationModalData] =useState(null);

  useEffect( ()=>{
    console.log(course.CourseContent.length)
  },[course.CourseContent])

  const deleteSectionHandler=async(sectionId ,token)=>{
    console.log("deleting course section")
    const result= await deleteSection({
      sectionID:sectionId,
      courseID:course._id,      
    },token)
    if(result){
      dispatch(setCourse(result))
    }
    setConformationModalData(null)
  }

  const deleteSubSectionHandler=async(subsectionId ,sectionId, token)=>{
    const result=await deleteSubSection({
      subsectionID:subsectionId,
      sectionID:sectionId,
      courseId:course._id     
    },token);

    if(result){
      // const updatedCourseContent=course.CourseContent.map((section)=> section._id === sectionId ? result : section);
      // const updatedCourseData={...course,CourseContent:updatedCourseContent}
      dispatch(setCourse(result))
    }
    setConformationModalData(null)
  }


  return (
    <div>
      <div className='rounded-lg bg-richblack-700 py-6 px-8'>
        {
          course?.CourseContent?.map((section)=>(
           
            <details key={section._id} open>           
             {/* to make the folllowing div collapse on button click ,kwe are using details tag */}
              <summary className='flex items-center justify-between gap-x-2 border-b-2'>
                <div className='flex gap-x-3'>
                  <RxDropdownMenu/>
                  <div>{section.SectionName}</div>
                </div>

                <div className='flex gap-x-2'>
                  <button onClick={()=> handleChangeEditSectionName(section._id,section.sectionName)}><MdModeEditOutline/></button>
                  
                  <button 
                   onClick={ ()=> setConformationModalData(
                      {
                        text1:"Delete this section",
                        text2:"All the lectures in this section will be deleted",
                        btn1Handler:()=> deleteSectionHandler(section._id , token),
                        btn1text:"Delete",
                        btn2text:"Cancel",
                        btn2Handler:()=>setConformationModalData(null)
                      }
                    )}>
                    <RiDeleteBin6Line/>
                  </button>


                  <span>|</span>

                  <button><MdArrowDropDown/></button>

                </div>              
              </summary>

              <div>
                  {
                    section.SubSection.length > 0 && (
                        section?.SubSection?.map((subsection)=>(
                        <div key={subsection._id} onClick={()=>setViewSubSection(subsection)} className='flex justify-between'>
                          <div className='flex gap-x-3 items-center'>
                            <RxDropdownMenu/>
                            <div>{subsection?.SubSectionName}</div>
                          </div>

                          <div className='flex gap-x-3 items-center' onClick={(e)=>e.stopPropagation()}>
                            <button onClick={()=>setEditSubSection({...subsection,sectionId:section._id})}><MdModeEditOutline/></button>
                            <button onClick={()=>setConformationModalData({
                              text1:"Delete this sub section",
                              text2:"this sub section will be deleted permanently",
                              btn1Handler:()=>deleteSubSectionHandler(subsection._id ,section._id,token),
                              btn1text:"Delete",
                              btn2text:"Cancel",
                              btn2Handler:()=>setConformationModalData(null)
                            })}><RiDeleteBin6Line/></button>
                          </div>
                        </div>                      
                      ))
                    )
                  }
                  <button className='flex gap-x-3 items-center' onClick={()=> setAddSubSection(section._id)}>
                    <RiVideoAddFill/>
                    <div>Add Lecture</div>
                  </button>
              </div>
            </details>
          ))
        }
      </div>
      

      {
        addSubSection ? (
          <SubSectionModal modalData={addSubSection} setModalData={setAddSubSection}  add={true}/>
        ) : 
        viewSubSection ? (
          <SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true}/>
        ) :
        editSubSection ? (
          <SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true} />
        ) : (<div></div>)
      }
      {
        confirmationModalData && (<ConfirmationModal modalData={confirmationModalData}/>)
      }
    </div>
  )
}

export default NestedView