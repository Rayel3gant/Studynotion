import React from 'react'
import HighlightText from '../homepage/HighlightText'
import image1 from "../../../assets/Images/aboutus1.webp"
import image2 from "../../../assets/Images/aboutus2.webp"
import image3 from "../../../assets/Images/aboutus3.webp"


const AboutSection1 = () => {
  return (
    <div className='w-full bg-richblack-800 '>
        <div className='w-11/12 max-w-[1035px] flex flex-col gap-y-3 items-center mx-auto'>
            <div className='text-richblack-200 text-lg'>About us </div>
            <div className='text-3xl text-center text-richblack-5'>Driving Innovation in Online Education for a <HighlightText text={"Brighter Future"}/> </div>
            <div className='text-richblack-300 text-center text-sm'>
                Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
            </div>

            <div className='w-full place-content-center gap-y-4 md:grid-cols-2 md:grid-rows-2 md:gap-5 grid lg:grid-cols-3 lg:grid-rows-1 lg:gap-x-8 lg:translate-y-16 '>
                <img src={image1} alt='' className=''></img>
                <img src={image2} alt='' className=''></img>
                <img src={image3} alt='' className=''></img>

            </div>
        </div>
    </div>
  )
}

export default AboutSection1