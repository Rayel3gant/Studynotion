import React from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { getCatalogaPageData } from "../services/operations/pageAndComponentData"
import { useEffect } from 'react';
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apis';
import CourseSlider from '../components/core/catalog/CourseSlider';
import CourseCard from '../components/core/catalog/CourseCard';

const Catalog = () => {
    const { catalogName } =useParams();
    const [catalogPageData,setCatalogPageData]=useState(null);
    const [categoryId,setCategoryId]=useState(null);
    const [active, setActive] = useState(1)


    const fetchCategoryId=async()=>{
        try{
            const result=await apiConnector("GET",categories.CATEGORIES_API);
            const category_id=result?.data?.data.filter((item)=>item.Category.split(" ").join("-").toLowerCase() === catalogName)[0]._id ;
            setCategoryId(category_id);
        } catch(error){
            console.error(error)
        }
    }

    const fetchCategoryPageData=async()=>{
        try{
            const result =await getCatalogaPageData(categoryId);
            console.log("res",result)
            setCatalogPageData(result);
        } catch(error){
            console.error(error)
        }
    }
    useEffect(()=>{
        fetchCategoryPageData();
    },[categoryId])

    useEffect( ()=>{
        fetchCategoryId();
    },[catalogName]);

  return (
    <div className='w-full'>
        <div className='bg-richblack-800 py-8'>
            <div className='w-11/12 max-w-[1035px] mx-auto flex flex-col gap-y-3'>
                <div className='text-richblack-300 text-sm'>{` Home / Catalog / `} <span className='text-yellow-50'>{ catalogPageData?.data?.selectedCategory?.Category}</span></div>
                <div className='text-3xl text-richblack-5'>{catalogPageData?.data?.selectedCategory?.Category}</div>
                <div className='text-sm text-richblack-200'>{catalogPageData?.data?.selectedCategory?.Description}</div>
            </div>
        </div>

        <div className='my-10'>
            <div className='w-11/12 max-w-[1035px] mx-auto'>
                <div className='text-3xl text-richblack-5'>Courses to get you started</div>
                <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                    <p
                        className={`px-4 py-2 ${
                        active === 1? "border-b border-b-yellow-25 text-yellow-25": "text-richblack-50"} cursor-pointer`}
                        onClick={() => setActive(1)}
                    >
                        Most Popular
                    </p>
                    <p
                        className={`px-4 py-2 ${active === 2? "border-b border-b-yellow-25 text-yellow-25": "text-richblack-50"} cursor-pointer`}
                        onClick={() => setActive(2)}
                    >
                        New
                    </p>
                </div>
                <div className='my-8 '>
                    <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.Course}/>
                </div>
            </div>

            <div className='w-11/12 max-w-[1035px] mx-auto'>
                <div className='text-3xl text-richblack-5'>Top courses in {catalogPageData?.data?.differentCategory?.Category}</div>
                <div className='mt-16'>
                    <CourseSlider Courses={catalogPageData?.data?.differentCategory?.Course}/>
                </div>
            </div>

            <div className='w-11/12 max-w-[1035px] mx-auto mt-8'>
                <div className='text-3xl text-richblack-5'>Frequently bought</div>

                <div className='mt-16 flex justify-center items-center'>
                    <div className='grid grid-cols-1     md:grid-cols-2 md:gap-x-40 '>
                    {
                        catalogPageData?.data?.mostSellingCourses.slice(0,4).map((course,index)=>(
                            <CourseCard course={course} key={index}/>
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>


        <Footer/>

    </div>
  )
}

export default Catalog