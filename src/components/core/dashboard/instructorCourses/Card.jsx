import React from 'react'
import { COURSE_STATUS } from '../../../../utils/Constant';
import { SiNike } from "react-icons/si";
import { TfiTimer } from "react-icons/tfi";
import { FaRupeeSign} from "react-icons/fa";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin5Line} from "react-icons/ri"
const Card = (props) => {
    const course=props.course;
    const editHandler=()=>{

    }
    const deleteHandler=()=>{

    }
  return (
    <div className='flex'>
        <div className='flex'>
            <div><img src={course.Thumbnail} alt=''/></div>
            <div className='flex flex-col'>
                <div>{course.CourseTitle}</div>
                <div>{course.CourseDescription}</div>
                <div>Last Updated : {course.LastUpdated}</div>
                {
                    course.Status===COURSE_STATUS.PUBLISHED ? (
                        <div className='flex gap-x-2'>
                            <SiNike/>
                            <div>Published</div>
                        </div>
                    ) :(<div className='flex gap-x-2'>
                        <TfiTimer/>
                        <div>Drafted</div>
                    </div>)
                }
            </div>
        </div>
        <div>20 h 15 m</div>
        {/* we have to add total duration of course in model */}

        <div><FaRupeeSign/> {course. CoursePrice}</div>

        <div className='flex '>
            <button onClick={editHandler}><TiEdit/></button>
            <button onClick={deleteHandler}><RiDeleteBin5Line/></button>
        </div>
    </div>
  )
}

export default Card