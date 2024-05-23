import React from 'react'

const data=[
    { count:"5k", label:"Active Students"},
    { count:"10+", label:"Mentors"},
    { count:"200+", label:"Courses"},
    { count:"50+", label:"Awards"}
]
const Stats = () => {
  return (
    <div className='w-full bg-richblack-800 py-12'>
        <div className='w-11/12 max-w-[1035px] mx-auto grid grid-cols-2 grid-rows-2 gap-y-4  md:grid-cols-4 md:grid-rows-1 '>
        {
            data.map ( (stat,index) =>{
                return(
                    <div key={index} className='place-self-center text-center'>
                        <div className='text-richblack-5 text-2xl font-bold'>{stat.count}</div>
                        <div className='text-sm text-richblack-500'>{stat.label}</div>
                    </div>
                )
            })
        }
        </div>
    </div>
  )
}

export default Stats