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
    <div className='w-full flex lg:flex-row flex-col gap-y-8 justify-between items-center '>


        <div className='lg:w-[40%] w-full mx-auto flex flex-col '>
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

        {/* <div className='lg:w-[50%] w-full relative shadow-blue-200 ' >
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
        </div> */}


        <div className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]">
          <div className="absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10 ">
            {/* Section 1 */}
            <div className="flex gap-5 items-center lg:border-r border-caribbeangreen-300 px-7 lg:px-14">
              <h1 className="text-3xl font-bold w-[75px]">10</h1>
              <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                Years experiences
              </h1>
            </div>

            {/* Section 2 */}
            <div className="flex gap-5 items-center lg:px-14 px-7">
              <h1 className="text-3xl font-bold w-[75px]">250</h1>
              <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                types of courses
              </h1>
            </div>
            <div></div>
          </div>
          <img
            src={image}
            alt="timelineImage"
            className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit"
          />
        </div>
    </div>
  )
}

export default HomepageSection2