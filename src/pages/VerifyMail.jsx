import React, { useEffect, useState } from 'react'
import { FiArrowLeftCircle } from "react-icons/fi"
import { IoIosTimer }from "react-icons/io"
import OTPInput from 'react-otp-input'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../components/common/Loader"
import { useNavigate } from 'react-router-dom'
import { sendOtp, signup } from '../services/operations/authApi'

const VerifyMail = () => {
  const { loading ,signupData }=useSelector ( (state) => state.auth);
  const [otp,setOtp]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();

  console.log("signup data",signupData)
  useEffect( () =>{
    if(!signupData){
      navigate("/signup")
    }
  },[])
 

  const submitHandler=(event)=>{
    event.preventDefault();
    const {
      FirstName, LastName ,Email , ContactNo,Password ,ConfirmPassword, AccountType 
    } =signupData;
    console.log("otp submitted",otp)
    dispatch(signup(FirstName,LastName,Email,ContactNo,Password,ConfirmPassword,AccountType,otp,navigate));
  }
  return (
    <div>
      {
        loading ? (<Loader/>) : 
        (
          <div className='w-full h-screen bg-richblack-900 overflow-hidden flex justify-center items-center'>
            <div className='w-[80%] max-w-[500px] flex flex-col mx-auto'>
                <div className='text-3xl text-white font-bold'>Verify email</div>
                <div className='text-[14px] text-richblack-100 mt-2'>A verification code has been sent to you. Enter the code below</div>
                
                <form onSubmit={submitHandler} className='mt-5'>
                  <OTPInput
                     value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      renderInput={(props) => (
                        <input {...props} placeholder="-"
                          style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                          }}
                          className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                        />
                      )}
                      containerStyle={{
                        justifyContent: "space-between",
                        gap: "0 6px",
                      }}
                    
                  />
                  <button  type='submit' className='mt-6 rounded-md w-full py-3 text-xl flex place-content-center bg-yellow-50'>Verify email</button>    
                </form>


                <div className='flex w-full justify-between '>
                  <button onClick={() => navigate("/login")} className='flex  gap-x-2 text-richblack-50 items-center mt-5'><FiArrowLeftCircle/> Back to login</button>
                  <button onClick={()=> dispatch(sendOtp(signupData.Email,navigate))} className='flex  gap-x-2 text-blue-100 items-center mt-5'><IoIosTimer/> resend it</button>

                </div>
            
            
            </div>
          </div>
        )
      }
    </div>
  )
}

export default VerifyMail