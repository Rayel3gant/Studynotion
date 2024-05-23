import React from 'react'
import AboutSection1 from '../components/core/about/AboutSection1'
import AboutSection2 from '../components/core/about/AboutSection2'
import AboutSection3 from '../components/core/about/AboutSection3'
import Form from '../components/common/Form'
import Footer from "../components/common/Footer"
import ReviewSlider from "../components/common/ReviewSlider"
const About = () => {
  return (
    
    <div className='w-full bg-richblack-900'>
      <AboutSection1/>
      <AboutSection2/>
      <AboutSection3/>


      <div className='w-[80%] max-w-[600px] mx-auto pt-16'>
        <div className='text-richblack-5 text-3xl font-bold text-center'>Get in Touch</div>
        <div className='text-richblack-300 text-sm text-center'>We’d love to here for you, Please fill out this form.</div>
        <Form/>
          
      </div>

      <div className='w-11/12 mx-auto max-w-[1035px]'>
        <div className='text-3xl text-richblack-5 text-center py-8' >Reviews from other learners</div>
        <ReviewSlider/>
      </div>

      <Footer/>
    </div>
        
  )
}

export default About