import React from 'react';
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import image from "../../../assets/Images/TimelineImage.png"

const timeLine=[
    {
        logo:Logo1,
        heading:"Leadership",
        description:"fully committed  to the company's success"
    },
    {
        logo:Logo2,
        heading:"Responsibility",
        description:"Students will always be our top priority"
    },{
        logo:Logo3,
        heading:"Flexibility",
        description:"The ability to switch is an important skills"
    },{
        logo:Logo4,
        heading:"Solve the problem",
        description:"Code your way to a solution"
    }

]

const HomepageSection2 = () => {
  return (
    <div className='w-full flex lg:flex-row flex-col gap-y-8 justify-between '>


        <div className='lg:w-[40%] w-full flex flex-col '>
            {
                timeLine.map( (element ,index)=>{
                    return(
                        <div className='flex justify-between' key={index}>
                            <div className='flex flex-col  items-center'>
                                <div className='w-[52px] h-[52px] rounded-full bg-white flex items-center justify-center'>
                                    <img src={element.logo} className='w-[20px] h-[24px]'></img>
                                </div>
                                {
                                    (index !== timeLine.length -1) ? (
                                        <div>
                                            <div>.</div><div>.</div><div>.</div>
                                        </div>
                                    ) :(<div></div>)
                                }
                                
                            </div>

                            <div className='w-[80%]'>
                                <div className='font-bold'>{element.heading}</div>
                                <div>{element.description}</div>
                            </div>
                        </div>
                    )
                })
            }
        </div>

        <div className='lg:w-[50%] w-full relative shadow-blue-200 ' >
            <img src= {image} alt='image' className='shadow-[10px_10px_0px_0px_white] '></img>

            <div className='absolute top-[21rem] left-[4.5rem] w-[70%] bg-[#014A32] py-8 place-content-evenly flex rounded-md'>
                <div className='flex gap-x-3 w-[35%]'>
                    <div className='font-bold text-white text-3xl'>10</div>
                    <div className='text-[#05A77B] text-xs'>YEARS EXPERIENCES</div>
                </div>
                <div className='w-[1px]  bg-[#05A77B]'></div>
                <div className='flex gap-x-3 w-[35%] '>
                    <div className='font-bold text-white text-3xl'>250</div>
                    <div className='text-[#05A77B] text-xs'>TYPES OF COURSES</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomepageSection2