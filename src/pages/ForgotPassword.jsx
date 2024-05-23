import React, { useState } from 'react'
import { FiArrowLeftCircle } from "react-icons/fi"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authApi';



const ForgotPassword = () => {
    const [formData,setFormData]=useState({mail:""});
    const [mailStatus,setMailStatus]=useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();


    const submitHandler=(event)=>{
        event.preventDefault();
        console.log("sending reset password link to :",formData.mail)
        dispatch(getPasswordResetToken(formData.mail,setMailStatus));
        if(mailStatus){
            navigate("/resendMail");
        }
       
        
    }
    const changeHandler = (event) =>{
        event.preventDefault();
        setFormData( (prevFormData) =>{
            return{
                ...prevFormData,
                [event.target.name]:event.target.value
            }
        })
    }
  return (
    <div className='w-full h-screen bg-richblack-900 overflow-hidden flex justify-center items-center'>
        <div className='w-[80%] max-w-[500px] flex flex-col mx-auto'>
            <div className='text-3xl text-white font-bold'>Reset Your Password</div>
            <div className='text-[14px] text-richblack-100'>Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery</div>

            <form onSubmit={submitHandler}>
                <div className='w-full flex flex-col gap-y-3 mt-2'>
                    <label htmlFor='mail' className='text-sm text-richblack-5'>Email Address <sup className='requiredValue'>*</sup></label>
                    <input type='email' id='mail' name='mail' required value={formData.mail} onChange={changeHandler} placeholder='Enter email address' className='p-2 bg-richblack-800 rounded-md'></input>
                </div>

                <button type='submit' className='mt-8 rounded-md w-full py-3 text-xl flex place-content-center bg-yellow-50'>Reset Password</button>

                <a href='/login' className='flex gap-x-2 text-richblack-50 items-center mt-2'><FiArrowLeftCircle/> Back to login</a>
            </form>
        </div>
    </div>
  )
}

export default ForgotPassword