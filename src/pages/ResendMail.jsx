import React from 'react'
import { FiArrowLeftCircle } from "react-icons/fi"

const ResendMail = () => {

    const clickHandler=()=>{

    }
  return (
    <div className='w-full h-screen bg-richblack-900 overflow-hidden flex justify-center items-center'>
            <div className='w-[80%] max-w-[500px] flex flex-col mx-auto'>
                <div className='text-3xl text-white font-bold'>Check Email</div>
                <div className='text-[14px] text-richblack-100'>We have sent the reset email to youremailaccount@gmail.com</div>
                <button  onClick={clickHandler} className='mt-8 rounded-md w-full py-3 text-xl flex place-content-center bg-yellow-50'>Resend Mail</button>    
                <a href='/login' className='flex  gap-x-2 text-richblack-50 items-center mt-5'><FiArrowLeftCircle/> Back to login</a>
            </div>
    </div> 
  )
}

export default ResendMail