import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { useDispatch, useSelector } from 'react-redux';
import RatingStars from '../components/common/RatingStars';
import GetAvgRating from '../utils/avgRating';
import { MdLanguage } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdAccessibilityNew } from "react-icons/md";
import { AiOutlineMobile } from "react-icons/ai";
import { TbCertificate } from "react-icons/tb"
// import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { TbCurrencyRupee } from "react-icons/tb"
import { buyCourse } from '../services/operations/paymentsAPI';
import ConfirmationModal from '../components/common/ConfirmationModal';
import { formatDate } from "../utils/formatDate";
import { AiOutlineShareAlt } from "react-icons/ai"
import copy from 'copy-to-clipboard';
import { ACCOUNT_TYPE} from "../utils/Constant"
import { addToCart } from '../redux/slices/cartSlice';
import CourseContentAccordion from '../components/core/course/CourseContentAccordion';
import ShareModal from '../components/common/ShareModal';
import Footer from "../components/common/Footer"
import ReviewSlider from "../components/common/ReviewSlider"
import Markdown from 'markdown-to-jsx';
// import Markdown from 'react-markdown'

const CourseDetails = () => {
    const  { courseId } =useParams();
    console.log("course id",courseId)
    console.log(typeof(courseId))
    const [courseData,setCourseData]=useState('');
    const { token } =useSelector((state)=>state.auth);
    const [avgRating , setRating] =useState(0);
    const [totalLectures,setTotalLectures]=useState(0);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const { user } =useSelector((state)=>state.profile);
    const [confirmationModalData ,setConfirmationModalData]=useState(null);
    const [shareModalData,setShareModalData]=useState(null);
    const [isActive,setIsActive]=useState(Array(0));


    const handleActive=(id)=>{
      setIsActive(
        ! isActive.includes(id) ? isActive.concat(id):isActive.filter((e)=>e !== id)
      )
    }

    const buyCourseHandler=async()=>{
      console.log(token);
      console.log(courseId);
      console.log(user);

      //to restrict guest users from buying course
      if(token){
        const result=await buyCourse(token, [courseId] ,user ,navigate, dispatch);
        console.log(result);
        return;
      }
     
      setConfirmationModalData({
        text1:"You are not logged in",
        text2:"Log in to your account or Create a new one",
        btn1text:"Log In",
        btn2text:"Sign up",
        btn1Handler: () => navigate("/login"),
        btn2Handler :() => navigate("/signup")
      })
      

    }


    const fetchCourseData=async(courseId)=>{
      try{
        const result= await getFullDetailsOfCourse(courseId ,token);
        console.log("result",result.courseDetails);
        if(result){
          setCourseData(result.courseDetails);
        }
      } catch(error){
        console.log(error)
      }
    }
    useEffect(()=>{
      fetchCourseData(courseId);
    },[courseId])

    useEffect(()=>{
      const rating = GetAvgRating(courseData.RatingAndReviews);
      setRating(rating);
      console.log("rating :",rating)
      countLectures();
  },[courseData]);

  const countLectures=()=>{
    let lectures=0;
//WE can calculate total course duration here
    courseData?.CourseContent?.forEach((section)=>{
      lectures+=section.SubSection?.length || 0;
    })
    setTotalLectures(lectures);
  }

  const handlerShare=()=>{
    setShareModalData({
      link:window.location.href,
      btn1Handler: () => copy(window.location.href),
      btn2Handler :()=> setShareModalData(null)
    })
  }

  const cartAdditionHandler=()=>{
    if( user && user.AccountType === ACCOUNT_TYPE.INSTRUCTOR){
      console.log("only students can buy the course");
      return;
    }
    if(token){
      dispatch(addToCart(courseData))  //?
    }

    setConfirmationModalData({
      text1:"You are not logged in",
      text2:"Log in to your account or Create a new one",
      btn1text:"Log In",
      btn2text:"Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler :()=> setConfirmationModalData(null)
    })
  }

  
  return (
    <div className=''>

      <div className='py-8 w-full bg-richblack-800 relative'>
        <div className='flex flex-col gap-y-2 border-r-2 px-12  border-richblack-700 lg:w-[65%]'>

          <div>{`Home / Learning /`} <span className='text-yellow-50'>{courseData?.Category?.[0]?.Category}</span></div>
          <div className='text-3xl text-richblack-5'>{courseData?.CourseTitle}</div>
          <div className='text-sm text-richblack-200'>{courseData?.CourseDescription}</div>
          <div className='flex gap-x-2'>
            <div className='text-yellow-50'>{ avgRating || 0}</div>
            <RatingStars Review_Count={avgRating} />
            <div className='text-sm text-richblack-25'>{`( ${courseData.RatingAndReviews?.length} Ratings)`}</div>
            <div className='text-sm text-richblack-25'>{courseData.EnrolledStudents?.length} students</div>
          </div>

          <div className='text-sm text-richblack-25'>Created by : {courseData.Instructor?.FirstName} {courseData.Instructor?.LastName}</div>
          <div className='flex gap-x-5 text-sm text-richblack-25'>
            <div>Created at :{formatDate(courseData.CreatedAt)} </div>
            <div className='flex gap-x-1 items-center'> <MdLanguage/> English</div>
          </div>
        </div>

        <div className='lg:w-[25%] hidden lg:flex  flex-col gap-y-2 absolute top-12 right-16 bg-richblack-700 rounded-md'>
            <img src={courseData?.Thumbnail}/>
            <div className='px-5 pb-4 flex flex-col gap-y-2'>
              <div className='flex gap-x-2 items-center text-richblack-300'><TbCurrencyRupee/> <div>{courseData?.CoursePrice}</div></div>
              <div>
                {
                  user.Courses.includes(courseId)? (<div>
                    <button className='w-full bg-yellow-50 py-2 rounded-md' onClick={()=>navigate("")}>Go to courses</button>
                  </div>):(
                    <div className='flex flex-col gap-y-3 px-3'>
                      <button className='w-full bg-yellow-50 py-2 rounded-md' onClick={()=>cartAdditionHandler()}>Add to cart</button>
                      <button className='w-full bg-richblack-800 py-2 rounded-md' onClick={()=>buyCourseHandler()}>Buy Now</button>
                    </div>
                  )
                }
              </div>
              <div className='text-richblack-5 text-sm text-center'>30-Day Money-Back Guarantee</div>

              <div className='flex flex-col gap-y-3  '>
                <div className='text-richblack-5 text-xl'>This course includes :</div>
                <div className='flex flex-col gap-y-1 '>
                  <div className='flex gap-x-2 text-caribbeangreen-100 text-sm items-center'>
                    <AiOutlineClockCircle/>
                    <div>8 hours on demand video</div>
                  </div>

                  <div className='flex gap-x-2 text-caribbeangreen-100 text-sm items-center'>
                    <MdAccessibilityNew/>
                    <div>Full Lifetime access</div>
                  </div>

                  <div className='flex gap-x-2 text-caribbeangreen-100 text-sm items-center'>
                    <AiOutlineMobile/>
                    <div>Access on mobile and TV</div>
                  </div>

                  <div className='flex gap-x-2 text-caribbeangreen-100 text-sm items-center'>
                    <TbCertificate/>
                    <div>Certification of completion</div>
                  </div>
                </div>

              </div>
              <div className='text-sm text-yellow-5 place-self-center pt-3'>
                <button onClick={handlerShare} className='flex gap-x-2 items-center text-center' >
                  <AiOutlineShareAlt/>
                  Share
                </button>
              </div>
            </div>
        </div>
      </div>


      <div className='w-full lg:hidden mt-5'>
      {
        user.Courses.includes(courseId)? (<div>
          <button className='w-full bg-yellow-50 px-5 py-2 rounded-md' onClick={()=>navigate("")}>Go to courses</button>
            </div>):(
              <div className='w-full flex flex-col gap-y-3 px-5 lg:hidden mt-5'>
                <button className='w-full bg-yellow-50 py-2 rounded-md' onClick={()=>cartAdditionHandler()}>Add to cart</button>
                <button className='w-full bg-richblack-800 py-2 rounded-md' onClick={()=>buyCourseHandler()}>Buy Now</button>
              </div>
            )
      }
        
      </div>




      <div className='w-11/12 max-w-[1035px] flex gap-x-5 mx-auto pt-10'>
        <div className='flex flex-col gap-y-8 lg:w-[70%]'>
          <div className='w-full border-2 border-richblack-700 px-4 py-5  '>
            <div className='text-3xl text-richblack-5'>What you'll learn</div>
            <div className='text-sm pt-4 text-richblack-50'>
              <Markdown>{courseData?.Learnings}</Markdown>
            </div>
          </div>

          <div className='w-full '>
            <div className='text-3xl text-richblack-5'>Course Content</div>
            <div className='w-full flex justify-between items-center'>
              <div className='flex gap-x-2 text-yellow-5 mt-3'>
                <div >{courseData?.CourseContent?.length} Sections</div>
                <div>{totalLectures} Lectures</div>
                <div>{courseData?.totalDuration}</div>    {/* ??? */}
              </div>

              <button className='text-yellow-50' onClick={()=>setIsActive([])}>Collaps all sections</button>
            </div>
            <div>
              {
                courseData.CourseContent?.map((course,index)=>(
                  <CourseContentAccordion key={index} course={course} isActive={isActive} handleActive={handleActive}/>
                ))
              }
            </div>           
          </div>

          <div className='w-full flex flex-col gap-y-2'>
            <div className='text-3xl text-richblack-5'>Author</div>
            <div className='flex gap-x-4 items-center'>
              <img src={courseData.Instructor?.Image} className='w-[52px] h-[52px] rounded-full'/>
              <div className='text-sm text-richblack-5'>{courseData.Instructor?.FirstName} {courseData.Instructor?.LastName}</div>
            </div>
            <div className='text-sm text-richblack-50'>I will be your lead trainer in this course. Within no time, I will help you to understand the subject in an easy manner. I have a huge experience in online training and recording videos. Let's get started!</div>

          </div>
        </div>

        

        
      </div>


      <div className='w-11/12 max-w-[1035px] mx-auto py-8'>
            <div className='text-3xl text-richblack-5 text-center py-8' >Reviews from other learners</div>           
            <ReviewSlider/>
      </div>


      <Footer/>

      {
        confirmationModalData && <ConfirmationModal modalData={confirmationModalData}/>
      }
      {
        shareModalData && <ShareModal modalData={shareModalData}/>
      }
    </div>
  )
}

export default CourseDetails