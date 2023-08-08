import React from 'react';
import { Swiper , SwiperSlide } from 'swiper/react'
import { Navigation, Pagination , FreeMode, Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import ReactStars from "react-rating-stars-component";
import { useState } from 'react';
import { ratingsEndpoints } from '../../services/apis';
import { getReviews } from '../../services/operations/courseDetailsAPI';
import { useEffect } from 'react';
import { MdStar, MdStarBorder, MdStarHalf } from 'react-icons/md'


const ReviewSlider = () => {
    const [reviews,setReviews]=useState([]);
    const truncateWords=15;

    const fetchAllReviews=async()=>{
        try{
            const result=await getReviews();
            console.log( "all reviews are:",result.data)
            setReviews(result.data)

        } catch(error){
            console.error(error)
        }
    }
    useEffect(()=>{
        fetchAllReviews();
    },[])
  return (
    <div>
        <div className='h-[200px] max-w-maxContent'>
            <Swiper className='w-full'
                slidesPerView={1} 
                spaceBetween={24} 
                loop={true} 
                freeMode={true} 
                autoplay={{delay:2500 , disableOnInteraction:false}}
                breakpoints={{
                    640:{
                        slidesPerView:2,
                    },
                    768: {
                        slidesPerView: 3,
                        // spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 4,
                        // spaceBetween: 50,
                    },
                    }}
                modules={[Autoplay, FreeMode,Pagination,Navigation]}>
                
            {
                reviews.map((data,index)=>(
                    <SwiperSlide key={index} className='h-[180px] w-[250px] flex flex-col gap-y-3 bg-richblack-800 py-4 px-4 rounded-md'>
                        <div className='flex gap-x-3 items-center'>
                            <img src={data.User.Image} alt='' className='w-[40px] h-[40px] rounded-full'/>
                            <div>
                                <div className='flex gap-x-1 text-lg text-richblack-5'>
                                    <div>{data.User.FirstName}</div> 
                                    <div>{data.User.LastName}</div>
                                </div>
                                <div className='text-sm text-richblack-600'>{data.Course.CourseTitle}</div>
                            </div>
                        </div>

                        <div className='text-[14px] text-richblack-25'>
                            {data.Review.split(" ").length > truncateWords 
                            ? (`${data.Review.split(" ").slice(0,truncateWords).join(" ")}..`) 
                            : (`${data.Review}`) } 
                        </div>

                        <div className='flex gap-x-2 items-center'>
                            <div>{data.Rating.toFixed(1)}</div>
                            <ReactStars count={5} value={data.Rating} size={20} edit={false} activeColor="#ffd700" fullIcon={<MdStar/>} halfIcon={<MdStarHalf/>} emptyIcon={<MdStarBorder/>}/>
                        </div>

                    </SwiperSlide>
                ))
            }
            </Swiper>
        </div>

    </div>
  )
}

export default ReviewSlider