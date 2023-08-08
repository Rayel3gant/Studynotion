import React from 'react'
import { FiArrowLeftCircle } from "react-icons/fi"


const ResetComplete = () => {
    const clickHandler =()=>{

    }
  return (
    <div className='w-full h-screen bg-richblack-900 overflow-hidden flex justify-center items-center'>
        <div className='w-[80%] max-w-[500px] flex flex-col mx-auto'>
            <div className='text-3xl text-white font-bold'>Reset complete!</div>
            <div className='text-[14px] text-richblack-100 mt-2'>All done! We have sent an email to m***********@gmail.com to confirm</div>
            <button  onClick={clickHandler} className='mt-6 rounded-md w-full py-3 text-xl flex place-content-center bg-yellow-50'>Return to login</button>    
            <a href='/login' className='flex  gap-x-2 text-richblack-50 items-center mt-5'><FiArrowLeftCircle/> Back to login</a>
        </div>
    </div> 
  )
}

export default ResetComplete