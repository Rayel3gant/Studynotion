import React from 'react'
import aunty from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import Button from './Button'
import { BiRightArrowAlt } from "react-icons/bi";
import ReviewSlider from '../../common/ReviewSlider';

const HomepageSection4 = () => {
  return (
    <div className='w-full flex flex-col gap-y-5 my-20 '>

        <div className='flex md:flex-row flex-col gap-y-8 justify-between'>
            <div className='md:w-[40%] w-full place-self-center'>
                <img src={aunty} alt='instructor' className='shadow-[-20px_-20px_0px_0px_white]'/>
            </div>

            <div className='md:w-[45%] w-full flex flex-col '>
                <div className='text-white font-bold text-3xl'>Become an</div>
                <div className='text-3xl font-bold'><HighlightText  text={"Instructor"}/></div>
                <div className='text-richblack-200'>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </div>

                <div className='mt-12 place-self-start'>
                    <Button active={true} link={"/signup"}> <div className='flex  items-center gap-x-2'>Start Teaching Today <BiRightArrowAlt/></div></Button>
                </div>

            </div>
        </div>

        <div className='text-center text-white font-bold text-2xl mt-24'> Reviews from other learners</div>
        <ReviewSlider/>

    </div>
  )
}

export default HomepageSection4