import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { contactusEndpoint } from '../../services/apis';
import { apiConnector } from '../../services/apiConnector';
import data from "../../data/countrycode.json"

//conatact us form
//by using react hook form , we don't have to manage the state of formdata , validate errors 
const Form = () => {

    const [loading , setLoading]=useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors ,isSubmitSuccessful },
    } =useForm();

    useEffect( () =>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneno:"",
                countrycode:""
            })
        }
    },[reset,isSubmitSuccessful]);
    const { CONTACT_US_API } =contactusEndpoint;   // write controller for contact us

    const submitContactForm= async(data) =>{
        console.log("contact us data :",data)
        try{
            setLoading(true);
            const response=await apiConnector("POST",CONTACT_US_API,data)
            console.log("response :",response)
            setLoading(false)
        }
        catch(error){
            console.log(error)
            setLoading(false)
        }
    }
  return (
    <form onSubmit={handleSubmit(submitContactForm)} className='py-12'>
        <div className='w-full flex justify-between'>
            <div className='w-[48%]'>
                <label htmlFor='firstName' className='text-richblack-5 text-sm'>First Name</label><br></br>
                <input type='text' name='firstName' id='firstName' placeholder='Enter first name' className='bg-richblack-800 border-b-2 border-richblack-600 p-3 rounded-md w-full'  {...register ("firstName" ,{required:true})}></input>
                {/* registering state of firstName with some validation */}

                {  
                    errors.firstName && (
                        <span>Please enter your first name</span>
                    )
                }
                {/* error handling related to this field */}
            </div>

            <div className='w-[48%]'>
                <label htmlFor='lastName' className='text-richblack-5 text-sm'>Last Name</label><br/>
                <input type='text' name='lastName' id='lastName' placeholder='Enter last name' className='bg-richblack-800 border-b-2 border-richblack-600 p-3 rounded-md w-full' {...register("lastName")}></input>
                {
                    errors.lastName && (
                        <span>Please enter your last name</span>
                    )
                }
            </div>

        </div>

        <div className='mt-3'>
            <label htmlFor='email' className='text-richblack-5 text-sm'>Email address</label><br></br>
            <input type='email' name='email' id='email' placeholder='Enter your mail' className='bg-richblack-800 border-b-2 border-richblack-600 p-3 rounded-md w-full' { ...register("email", {required:true})}></input>
            {
                errors.email && (
                    <span>Please enter your mail</span>
                )
            }
        </div>


        <br/>
        <label htmlFor='contactNo' className='text-richblack-5 text-sm mt-3'>Phone number</label><br/>        
        <div className='w-full flex justify-between items-center' id='contactNo'>
            <div className='w-[15%]'>
                <select name='countrycode' id='countrycode' className='bg-richblack-800 p-3 border-b-2 border-richblack-600 rounded-md w-full' {...register("countrycode",{required:true})}>
                {
                    data.map( (countryData,index)=>{
                        return(
                            <option  key={index} value={countryData.code}> {countryData.code} - {countryData.country}</option>
                        )
                    })
                }

                </select>
            </div>

            <div className='w-[80%]'>
                <label></label>
                <input placeholder='12345 67890' className='bg-richblack-800 p-3 rounded-md w-full border-b-2 border-richblack-600 ' type='text' id='phoneno' name='phoneno' 
                    {...register("phoneno",{required:true ,maxLength:{value:10,message:"Invalid phone number"},minLength:{value:8,message:"Invalid phone number"}})}>
                    
                </input>
                {
                    errors.phoneno && (
                        <span>{errors.phoneno.message}</span>
                    )
                }
            </div>
        </div>

        <div className='mt-3'>
            <label htmlFor='message' className='text-richblack-5 text-sm'>Message</label><br/>
            <textarea id='message' name='message' cols="30" rows="7" placeholder='enter message' className=' border-b-2 border-richblack-600 bg-richblack-800 p-3 rounded-md w-full' {...register("message",{required:true})}></textarea>
            {
                errors.message && (
                    <span>please enter a message</span>
                )
            }
        </div>

        <button type='submit' className='mt-3 rounded-md bg-[#FFD60A] w-full py-3'>Send Message</button>


    </form>
  )
}

export default Form