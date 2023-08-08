import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { COURSE_STATUS } from "../../../../utils/Constant"
import { MdOutlinePublishedWithChanges } from "react-icons/md"
import { MdOutlineUnpublished } from "react-icons/md";
import { BiRupee } from "react-icons/bi";
import { MdModeEditOutline} from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import ConfirmationModal from "../../../common/ConfirmationModal"
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../redux/slices/courseSlice';
import { useNavigate } from 'react-router-dom';

const CourseTable = (props) => {
    const courses=props.courses;
    const setCourses=props.setCourses;
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const { token }=useSelector((state)=>state.auth);
    const [confirmationModalData,setConfirmationModalData]=useState(null);
    const [loading,setLoading]=useState(false);
    const TRUNCATE_LENGTH = 30

    const deleteCourseHandler=async(courseID)=>{
      setLoading(true);
      try{
        await deleteCourse({courseId:courseID}, token)
        const result=await fetchInstructorCourses(token);
        //return the updated course from the api , dont fetch data again
        if(result){
          setCourses(result);
        }
      } catch(error){
        console.error(error)
      }
      setConfirmationModalData(null);
      setLoading(false)
    }
  return (
    <div>
      <Table className="rounded-xl border border-richblack-800">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">COURSE</Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">DURATION</Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">PRICE</Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">ACTIONS</Th>
          </Tr>
        </Thead>

        <Tbody>
          {
            courses.length ===0 ? (
              <Tr>
                <Td className="py-10 text-center text-2xl font-medium text-richblack-100">No Courses Found</Td>
              </Tr>
            ) : (
              courses.map( (course )=>(
                <Tr key={course._id} className="flex gap-x-10 border-b border-richblack-800 px-6 py-8">
                  <Td className='flex flex-1 gap-x-4 '>
                    <img src={course.Thumbnail} className='h-[150px] w-[220px] rounded-lg object-cover'/>
                    
                    <div className='flex flex-col gap-y-2'>
                      <div className="text-lg font-semibold text-richblack-5">{course.CourseTitle}</div>
                      <div className="text-xs text-richblack-300">
                        {course.CourseDescription.split(" ").length >
                        TRUNCATE_LENGTH
                          ? course.CourseDescription
                              .split(" ")
                              .slice(0, TRUNCATE_LENGTH)
                              .join(" ") + "..."
                          : course.CourseDescription}
                      </div>
                      <div className="text-[12px] text-white">Created: </div>
                      <div>
                        {
                          course.Status === COURSE_STATUS.DRAFT? (
                            <div className='flex gap-x-3 px-5 py-3 w-fit bg-richblack-700 rounded-md text-pink-100 items-center'>
                              <MdOutlineUnpublished/>
                              <div>Drafted</div>
                            </div>
                          ) : (
                            <div className='flex gap-x-3 px-5 py-3 w-fit bg-richblack-700 rounded-md text-yellow-50 items-center'>
                              <MdOutlinePublishedWithChanges/>
                              <div>Published</div>
                            </div>
                          )
                        }
                      </div>
                    </div>
                  </Td>

                  <Td className="text-sm font-medium text-richblack-100 flex gap-x-1 items-center">{course.TotalDuration}</Td>

                  <Td className="text-sm font-medium text-richblack-100 flex gap-x-1 items-center">
                    <BiRupee/>
                    <div>{course.CoursePrice}</div>
                  </Td>

                  <Td className="text-lg font-medium text-richblack-100 flex gap-x-1 items-center">
                    <button onClick={()=>navigate(`/dashboard/editCourse/${course._id}`)}>
                      <MdModeEditOutline/>
                    </button>

                    <button onClick={()=>setConfirmationModalData({
                        text1:"Do you want to delete this course ?",
                        text2:"All the data related to this course will be deleted permanently",
                        btn1Handler:()=>deleteCourseHandler(course._id),
                        btn1text:"Delete",
                        btn2text:"Cancel",
                        btn2Handler:()=>setConfirmationModalData(null)
                      })}>
                      <MdOutlineDeleteOutline />
                    </button>
                  </Td> 

                </Tr>
              ))

            )
          }
        </Tbody>
      </Table>

      {
        confirmationModalData && <ConfirmationModal modalData={confirmationModalData}/> 
      }
    </div>
  )
}

export default CourseTable