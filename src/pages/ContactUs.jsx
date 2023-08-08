import React from 'react'
import { IoIosChatboxes } from "react-icons/io"
import { GiEarthAsiaOceania } from "react-icons/gi"
import { IoIosCall } from "react-icons/io"
import Form from '../components/common/Form'
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'

const ContactUs = () => {
  return (
    <div className='w-full bg-richblack-900 pt-10'>
        <div className='w-11/12 max-w-[1035px] mx-auto flex flex-col gap-y-8 lg:flex-row justify-between '>

            <div className='w-[35%] min-w-[350px] bg-richblack-800 rounded-md flex flex-col gap-y-7 py-10 px-3 h-fit self-center '>

                <div className='flex gap-x-3 items-center'>
                    <IoIosChatboxes className='text-richblack-100'/>
                    <div>
                        <div className='text-lg text-richblack-5 font-bold'>Chat with us</div>
                        <div className='text-sm text-richblack-200'>Our friendly team is here to help.</div>
                        <div className='text-sm text-richblack-200'>@mail address</div>
                    </div>
                </div>

                <div className='flex gap-x-3 items-center'>
                    <GiEarthAsiaOceania className='text-richblack-100'/>
                    <div>
                        <div className='text-lg text-richblack-5 font-bold'>Visit us</div>
                        <div className='text-sm text-richblack-200'>Come and say hello at our office HQ.</div>
                        <div className='text-sm text-richblack-200'>Here is the location/ address</div>
                    </div>
                </div>

                <div className='flex gap-x-3 items-center'>
                    <IoIosCall className='text-richblack-100 '/>
                    <div>
                        <div className='text-lg text-richblack-5 font-bold'>Call us</div>
                        <div className='text-sm text-richblack-200'>Mon - Fri From 8am to 5pm</div>
                        <div className='text-sm text-richblack-200'>+123 456 7890</div>
                    </div>
                </div>
            </div>

            <div className='w-[50%] min-w-[510px] border border-richblack-600 rounded-md px-10 py-5 self-center'>
                <div className='text-3xl text-richblack-5'>Got a Idea? We’ve got the skills. Let’s team up</div>
                <div className='tet-sm text-richblack-300'>Tell us more about yourself and what you’re got in mind.</div>

                <Form/>
            </div>
        </div>


        <div className='w-11/12 max-w-[1035px] mx-auto py-8'>
            <div className='text-3xl text-richblack-5 text-center py-8' >Reviews from other learners</div>           
            <ReviewSlider/>
        </div>


        <Footer/>

    </div>
  )
}

export default ContactUs