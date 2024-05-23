import React from 'react'
import { useNavigate } from 'react-router-dom'
import image from "../assets/Images/error.jpg"
import { BiLeftArrowAlt } from "react-icons/bi"

const NotFound = () => {
  const navigate=useNavigate();
  return (
    <div className='w-full h-[calc(100vh-4rem)] bg-richblack-5 overflow-hidden '>

        <div className='w-full h-full object-contain relative'>
          <img src={image} alt=''></img>

          <div className='w-fit absolute flex flex-col gap-y-5 z-10 top-12 left-12 pr-96 pb-96'>
            <div className='text-2xl'>Still lots left to be learned.....</div>
            <button onClick={ () => navigate("/")} className='bg-[#1E90FF] w-fit px-8 py-2 rounded-md'>
                <div className='flex gap-x-1 items-center'>
                  <div><BiLeftArrowAlt/></div>
                  <div>Back to Home</div>
                </div>
            </button>
          </div> 
          
        </div>
    </div>
  )
}

export default NotFound

