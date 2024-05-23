import React from 'react'
import Stats from './Stats'
import HighlightText from '../homepage/HighlightText'
import Button from '../homepage/Button'
import data from "../../../data/AboutPageData"
const AboutSection3 = () => {
  return (
    <div className='w-full'>
        <Stats/>
        <div className='w-full bg-richblack-900 py-10'>
            <div className='w-11/12 max-w-[1035px] mx-auto grid sm:grid-cols-2 sm:grid-rows-4 lg:grid-cols-4 lg:grid-rows-2'>
            {
                data.map( (card,index) =>{
                    return(
                        <div key={index} className={`${index===0 && "lg:col-span-2 bg-richblack-900"}
                        ${card.order===3 && "lg:col-start-2"}
                        ${ card.order % 2===1 ? ("bg-richblack-700") : ("bg-richblack-800")}                                               
                        `}>{
                            (card.order <0 ) ?
                            (<div>
                                <div className='text-3xl text-richblack-5' >{card.heading} <div><HighlightText text={card.highlightText}/></div></div>   
                                <div className='text-richblack-300 text-sm mt-2'>{card.description}</div>
                                <div className='w-fit mt-5'><Button active={true} link={card.BtnLink}>{card.BtnText}</Button></div>
                            </div>)
                            : 
                            (<div className='p-5'>
                                <div className='text-richblack-5 text-[15px]'>{card.heading}</div>
                                <div className='text-richblack-100 text-[12px]'>{card.description}</div>
                            </div>)
                        }
                            
                        </div>
                    )
                })
            }
            </div>
        </div>
    </div>
  )
}

export default AboutSection3