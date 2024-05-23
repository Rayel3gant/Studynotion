import React from 'react'

import HighlightText from '../homepage/HighlightText'
import image from "../../../assets/Images/FoundingStory.png"
const AboutSection2 = () => {
  return (
    <div className='w-full bg-richblack-900 mt-20'>
        <div className='w-11/12 max-w-[1035px] mx-auto'>
            <div className='text-richblack-100 text-3xl text-center'>                   
                <span>{`"`}</span> We are passionate about revolutionizing the way we learn. Our innovative platform
                <HighlightText text={" combines technology"}/>,
                <span className='bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold'> expertise </span>,and community to create an 
                <span className='bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold'> unparalleled educational experience.</span>
                <span>{`"`}</span>
            </div>           
        </div>

        <div className='w-full h-[1px] bg-[#2C333F] '></div>

        <div className='my-10 w-11/12 max-w-[1035px] mx-auto pt-12 flex flex-col gap-y-20 py-8'>

            <div className='w-full flex flex-col md:flex-row gap-y-5 justify-between'>
                <div className='md:w-1/2 w-full' >
                    <div className='text-3xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-transparent bg-clip-text font-semibold'>Our Founding Story</div>
                    <div className='text-sm text-richblack-300'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</div>
                    <div className='text-sm text-richblack-300'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</div>
                </div>

                <div className='md:w-[40%] w-full flex place-content-center'><img src={image} alt='' className=''/></div>
            </div>

            <div className='w-full flex flex-col md:flex-row gap-y-5 justify-between mt-8'>
                <div className='md:w-[40%] w-full'>
                    <div className='text-3xl bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-transparent font-semibold'>Our Vision</div>
                    <div className='text-sm text-richblack-300'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</div>
                </div>

                <div className='md:w-[40%] w-full'>
                    <div className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-3xl font-semibold lg:w-[70%]'>Our Mission</div>
                    <div className='text-sm text-richblack-300'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AboutSection2