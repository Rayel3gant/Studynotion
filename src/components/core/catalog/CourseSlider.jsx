import React from 'react';
import { Swiper , SwiperSlide } from 'swiper/react'
import { Navigation, Pagination , FreeMode, Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import CourseCard from './CourseCard';


const CourseSlider = (props) => {
    const Courses=props.Courses;
  return (
    <div>
        {
            Courses?.length > 0 ? (
                <Swiper 
                    slidesPerView={1} 
                    loop={true} 
                    spaceBetween={100}
                    pagination={true} 
                    modules={[Pagination , Autoplay ,Navigation]}
                    autoplay={{
                        delay:2500,
                        disableOnInteraction:false
                    }}
                    // navigation={true}
                    breakpoints={{
                        1024:{slidesPerView:2},
                    }}

                >
                {
                    Courses.map((course,index)=>(
                        <SwiperSlide key={index}>
                            <CourseCard course={course} />
                        </SwiperSlide>
                    ))
                }
                </Swiper>
            ) : (
                <div className='text-2xl text-richblack-100'>No courses found</div>
            )
        }
    </div>
  )
}

export default CourseSlider