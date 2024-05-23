import React from 'react';
import { MdElectricBolt } from "react-icons/md"

const UploadTips = () => {
  return (
    <div className='bg-richblack-800 py-5 px-6 rounded-md'>
        <div className='flex gap-x-3 items-center '><MdElectricBolt/> <div className='text-richblack-5 text-xl'>Course Upload Tips</div></div>
        <ul className='text-richblack-5 text-sm list-disc' >
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
            <li>Information from the Additional Data section shows up on the course single page.</li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
        </ul>

    </div>
  )
}

export default UploadTips