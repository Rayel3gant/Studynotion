import React from 'react';
import { HiUsers } from "react-icons/hi";
import { MdOutlineFormatListNumberedRtl } from "react-icons/md"

const CourseCard = (props) => {
    const heading=props.heading;
    const description=props.description;
    const level=props.level;
    const lessionNumber=props.lessionNumber;
    const currentCard=props.currentCard;
    const setCurrentCard=props.setCurrentCard;

    
    const selectCard =(heading) =>{
        setCurrentCard(heading);

    }
  return (
    <div className={`py-5 place-self-center px-5 text-richblack-400  w-[300px] ${ (currentCard === heading) ? ("bg-white shadow-[10px_10px_0px_0px_yellow]") : ("bg-richblack-800")}`} onClick={ () => selectCard(heading)} >
        <div className={` font-semibold text-xl ${ (currentCard === heading) ? ("text-black") : ("text-richblack-400")}`}>{heading}</div>
        <div className='mt-5'>{description} </div>
        <div className='mt-6'>------------------------------------------------</div>
        <div className='flex justify-between mt-2'>
            <div className='flex gap-x-2 items-center'>
                <HiUsers/>
                <div>{level} </div>
            </div>

            <div className='flex gap-x-2 items-center'>
                <MdOutlineFormatListNumberedRtl/>
                <div>{lessionNumber} lessons </div>
            </div>
        </div>

    </div>
  )
}

export default CourseCard