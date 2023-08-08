import React, { useState } from 'react'
import HighlightText from './HighlightText'
import courseData from "../../../data/homepage-explore"
import CourseCard from './CourseCard'

const tabsName=[
    "Free",
    "New to coding",
    "Most popular",
    "Skill path",
    "Career paths"
]

const HomepageSection5 = () => {
    const [currentTab,setCurrentTab]=useState(tabsName[0]);
    const [courses,setCourses]=useState(courseData[0].courses);
    const [currentCard,setCurrentCard]=useState(courseData[0].courses[0].heading);

    const setMyCard = (tag)=>{
        setCurrentTab(tag);
        const result=courseData.filter ( (course) => course.tag === tag);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }


  return (
    <div className='w-full flex flex-col gap-y-4 items-center mt-20 '>
        <div className='text-white font-bold text-3xl'>Unlock the <HighlightText text={"Power of Code"}/> </div>
        <div className='text-richblack-100'>Learn To Build Anything You Can Imagine</div>

        <div className={`flex flex-wrap justify-evenly text-richblack-25 py-2 px-5 rounded-full  bg-richblack-300`}>
            {
                 tabsName.map( (tab,index) =>{
                    return (
                        <div key={index} onClick={ () => setMyCard(tab)} className={`p-2 rounded-xl  transition-all duration-200 cursor-pointer ${ (currentTab===tab) ? (" text-white bg-richblack-900") : ("bg-richblack-300")}`}>
                            {tab}
                        </div>
                    )
                 })
            }
        </div>
        <div className='grid grid-cols-1 grid-rows-3 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-1  gap-y-8 w-full lg:justify-between transition-all duration-200 lg:translate-y-20 '>
            {
                courses.map ( (course,index) =>{
                    return (
                        <CourseCard key={index} heading={course.heading} description={course.description} level={course.level} lessionNumber={course.lessionNumber} currentCard={currentCard} setCurrentCard={setCurrentCard} />
                    )
                })
            }
        </div>
    </div>
  )
}

export default HomepageSection5