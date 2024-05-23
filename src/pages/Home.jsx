import React from 'react'
import { BiRightArrowAlt } from "react-icons/bi";
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/homepage/HighlightText';
import Button from '../components/core/homepage/Button';
import Banner from"../assets/Images/banner.mp4";
import Codeblocks from '../components/core/homepage/Codeblocks';
import HomepageSection2 from '../components/core/homepage/HomepageSection2';
import HomepageSection3 from '../components/core/homepage/HomepageSection3';
import HomepageSection4 from '../components/core/homepage/HomepageSection4';
import HomepageSection5 from '../components/core/homepage/HomepageSection5';
import Footer from '../components/common/Footer';
const Home = () => {
  return (
    <div className='w-full '>
        
        <div className='w-11/12 max-w-[1035px] flex flex-col gap-y-5 text-white mx-auto items-center justify-between relative'>

            <Link to={"/signup"}>
                <div className='group mt-5 rounded-full  text-white bg-richblack-800 font-bold transition-all duration-200 hover:scale-95 '>
                    <button className=' flex gap-x-3  px-4 py-2 items-center transition-all duration-200 group-hover:bg-richblack-900 '>
                        <div>Become an Instructor</div>
                        <BiRightArrowAlt/>
                    </button>
                </div>
            </Link>

            <div className='text-3xl font-semibold'>
                Empower your future with <HighlightText text={"Coding Skills"}/>
            </div>

            <div className='md:text-center w-full text-[16px] mx-auto  text-richblack-50'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className='flex gap-x-4'>
                <Button active={true} link={"/signup"} >Learn more</Button>
                <Button active={false} link={"/login"}>Book a demo</Button>
            </div>

           

            <div className='lg:mx-24 shadow-[15px_15px_0px_0px_white]'>
                <video muted loop autoPlay>
                    <source src={Banner} type='video/mp4' className=''></source>
                </video>
            </div>




            <div className='w-full flex flex-col gap-y-64 md:gap-y-20 my-16 pb-24 md:pb-8'>
                <div className='w-full  '>
                    <Codeblocks  heading={
                        <div>
                            <div>Unlock Your <HighlightText text={"coding skills"}/></div>
                            <div>with our online courses.</div>
                        </div>
                    }
                        bgGradient={<div className="codeblock1 absolute"></div>}
                        para={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you. "}
                        buttonText1={"Try it Yourself"} buttonText2={"Learn More"}  codeColor={"text-yellow-25"}  active1={"true"} active2={"false"} link1={"/signup"} link2={"/login"} flexDirection={"flex-row"}
                        code={`<!DOCTYPE html>\n<html>\nhead><title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n/head>\n/body/>\nh1><ahref="/">Header</a>\n`}
                    />
                </div>

                <div className='w-full '>
                    <Codeblocks heading={
                        <div>
                            <div>Start <HighlightText text={"coding"}/></div>                       
                            <div><HighlightText text={"in seconds."}/></div>
                        </div>
                    }
                        bgGradient={<div className="codeblock2 absolute"></div>}

                        para={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                        buttonText1={"Continue Lesson"} buttonText2={"Learn More"}  codeColor={"text-yellow-25"} active1={"true"} active2={"false"} link1={"/signup"} link2={"/login"}  flexDirection={"flex-row-reverse"}
                        code={`<!DOCTYPE html>\n<html>\nhead><title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n/head>\n/body/>\nh1><ahref="/">Header</a>\n`}
                    />
                </div>
            </div>

        </div>

        <div className='w-full bg-richblack-900'>
            <div className='w-11/12 max-w-[1035px] mx-auto'>
                <HomepageSection5/>
            </div>
        </div>


        <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='h-[300px]' id='homepageBG' >
                <div className='w-11/12 max-w-[1035px] h-full mx-auto  flex items-center justify-center'>
                    <div className='flex gap-x-6'>
                        <Button active={true} link={"/courses"}><div className='flex  items-center gap-x-2'>Explore Full Catalog <BiRightArrowAlt/></div></Button>
                        <Button active={false} link={"/courses"}>Learn More</Button>
                    </div>

                </div>
            </div>

            <div className='w-11/12 max-w-[1035px] mx-auto py-10 flex flex-col gap-y-10'>
                <div className='w-full flex flex-col md:flex-row gap-y-5 justify-between'>
                    <div className='md:w-[45%] w-full text-3xl'>
                        <div>Get the skills you need for a <HighlightText text={"job"} /></div>
                        <div><HighlightText text={"that is in demand"}/></div>
                    </div>

                    <div className='md:w-[45%] w-full flex flex-col gap-y-6 '>
                        <div>
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </div>

                        <div className='place-self-start'><Button active={true} link={"/"}>Learn More</Button></div>

                    </div>

                </div>
                <HomepageSection2/>
                <HomepageSection3/>

                
            </div> 
        </div>

        <div className='w-full bg-richblack-900'>
            <div className='w-11/12 max-w-[1035px] mx-auto'>
                <HomepageSection4/>
            </div>

        </div>



        <div className='w-full mt-8 py-10 bg-richblack-800'>
            <div className='w-1//12 max-w-[1035px] mx-auto'>
                <Footer/>
            </div>
        </div>
    
    </div>
  )
}
export default Home;
