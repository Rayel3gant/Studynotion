import React, { useState } from 'react'
import { FiArrowLeftCircle } from "react-icons/fi"
import {BsEye} from "react-icons/bs"
import {BsEyeSlash} from "react-icons/bs"
import { AiOutlineCheckCircle } from  "react-icons/ai"
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../components/common/Loader"
import { setLoading } from '../redux/slices/authSlice'
import { resetPassword } from '../services/operations/authApi'

const SetNewPassword = () => {
  const [formData,setFormData]=useState({password:"",confirmPassword:""});
  const [passwordType1,setPasswordType1]=useState("password");
  const [passwordType2,setPasswordType2]=useState("password");
  const [passwordImage1,setPasswordImage1]=useState(<BsEye/>);
  const [passwordImage2,setPasswordImage2]=useState(<BsEye/>);
  const navigate=useNavigate();
  const { loading } =useSelector( (state) =>state.auth);
  const dispatch=useDispatch();
  const location=useLocation();


  const passwordHandler1 =(event) =>{
    event.preventDefault();
    if(passwordType1==="password"){
      setPasswordImage1(<BsEyeSlash/>);
      setPasswordType1("text")
    }
    else{
      setPasswordImage1(<BsEye/>);
      setPasswordType1("password");

    }
  }

  const passwordHandler2 =(event) =>{
    event.preventDefault();
    if(passwordType2==="password"){
      setPasswordImage2(<BsEyeSlash/>);
      setPasswordType2("text")
    }
    else{
      setPasswordImage2(<BsEye/>);
      setPasswordType2("password");

    }
  }


  const changeHandler=(event) =>{
    event.preventDefault();
    setFormData ( (prevFormData) =>{
      return {
        ...prevFormData,
        [event.target.name]:event.target.value
      }
    })   
  }
  
  const submitHandler=(event)=>{
    event.preventDefault();
    const token=location.pathname.split('/').at(-1);  // token is present in url itself
    dispatch(resetPassword(formData.password,formData.confirmPassword, token));
  }

  return (
    <div>
      {
        loading ? (<Loader/>) : (
          <div className='w-full min-h-screen lg:h-screen bg-richblack-900 lg:overflow-hidden flex justify-center items-center'>
        <div className='w-[80%] max-w-[500px] flex flex-col mx-auto'>
          <div className='text-3xl text-richblack-5 font-semibold'>Choose New Password</div>
          <div className='text-[14px] text-richblack-100'>Almost done. Enter your new password and youre all set.</div>

          <form onSubmit={submitHandler} >

            <div className='flex flex-col w-full'>
              <label htmlFor='password' className='text-sm text-richblack-5'>Password <sup className='requiredValue'>*</sup></label>
              <div className=' flex justify-between bg-richblack-800 items-center rounded-md'>
                <input type={passwordType1} id='password'  name='password' required value={formData.password} onChange={changeHandler} placeholder='Enter password' className='p-2 w-[90%] bg-richblack-800 rounded-md ' ></input>
                <span className='pr-3' onClick={passwordHandler1}>{passwordImage1}</span>
              </div>
            </div>

            <div className='flex flex-col w-full mt-2'>
              <label htmlFor='confirmPassword' className='text-sm text-richblack-5'>Confirm Password <sup className='requiredValue'>*</sup></label>
              <div className='flex justify-between bg-richblack-800 items-center rounded-md'>
                <input type={passwordType2} id='confirmPassword'  name='confirmPassword' required value={formData.confirmPassword} placeholder='confirm password' onChange={changeHandler} className='p-2 w-[90%] bg-richblack-800 rounded-md' ></input>
                <span className='pr-3' onClick={passwordHandler2}> {passwordImage2}</span>
              </div>
            </div>

            <div className='w-[80%] grid grid-cols-2 grid-rows-3 text-caribbeangreen-300 text-[14px] gap-y-1 mt-2'>
              <div className='flex gap-x-2 items-center'>
                  <AiOutlineCheckCircle/>
                  <div>one lowercase character</div>
              </div>

              <div className='flex gap-x-2 items-center'>
                  <AiOutlineCheckCircle/>
                  <div>one uppercase character</div>
              </div>

              <div className='flex gap-x-2 items-center'>
                <AiOutlineCheckCircle/>
                <div>one special character</div>
              </div>

              <div className='flex gap-x-2 items-center'>
                <AiOutlineCheckCircle/>
                <div>minimum 8  characters</div>
              </div> 
              
              <div className='flex gap-x-2 items-center'>
                  <AiOutlineCheckCircle/>
                  <div>one number</div>
              </div>

            </div>

            
            

            <button type='submit' className='mt-10 rounded-md w-full py-3 text-xl flex place-content-center bg-yellow-50'>Reset Password</button>
            <a href='/login' className='flex gap-x-2 text-richblack-50 items-center mt-2'><FiArrowLeftCircle/> Back to login</a>

          </form>
        </div>
    </div>
        )
      }
    </div>
  )
}

export default SetNewPassword