import React from 'react'
import HighlightText from './HighlightText'
import Button from './Button'
import image1 from "../../../assets/Images/Know_your_progress.svg"
import image2 from "../../../assets/Images/Compare_with_others.svg"
import image3 from "../../../assets/Images/Plan_your_lessons.svg"

const HomepageSection3 = () => {
  return (
    <div className='w-full flex flex-col  gap-y-4 items-center my-20'>
        <div className='text-3xl'>Your swiss knife for <HighlightText text ={"learning any language"}/> </div>
        <div className='md:w-[760px] md:mx-auto text-richblack-200 md:text-center '>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</div>

        <div className='w-full  flex place-content-center '>
            <img className='w-[35%] object-contain -mr-28' src={image1} alt='image 1'/>
            <img className='w-[35%] object-contain' src={image2} alt='image 2'/>
            <img className='w-[35%] object-contain -ml-32' src={image3} alt='image 3'/>
        </div>
        <Button active={true} link={"/"}>Learn More</Button>
    </div>
  )
}

export default HomepageSection3