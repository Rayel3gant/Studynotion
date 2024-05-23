// import React, { useState } from 'react'
// import {BsEye} from "react-icons/bs"
// import {BsEyeSlash} from "react-icons/bs"
// import { useNavigate } from 'react-router-dom';
// import image from "../assets/Images/login.webp";
// import frame from "../assets/Images/frame.png"
// import { useDispatch } from 'react-redux';
// import { login } from '../services/operations/authApi';
// import { useSelector } from 'react-redux';

// const Login = (props) => {
//   const isLogged=props.isLogged;
//   const setLoggedStatus=props.setLoggedStatus;
//   const navigate=useNavigate();
//   const [formData,setFormData]=useState({mail:"",password:""});
//   const [passwordType,setPasswordType]=useState("password");
//   const [passwordImage,setPasswordImage]=useState(<BsEye/>);

//   const dispatch=useDispatch();
//   const { user } =useSelector( (state) => state.profile)


  
  // const changeHandler=(event) =>{
  //   event.preventDefault();
  //   setFormData ( (prevFormData) =>{
  //     return{
  //       ...prevFormData,
  //       [event.target.name]:event.target.value
  //     }
  //   })
  // }

//   const passwordHandler= (event) =>{
//     event.preventDefault();
//     if(passwordType==="password"){
//       setPasswordImage(<BsEyeSlash/>);
//       setPasswordType("text")
//     }
//     else{
//       setPasswordImage(<BsEye/>);
//       setPasswordType("password");

//     }

//   }

//   const submitHandler= (event) =>{
//     event.preventDefault();
//     dispatch(login(formData.mail,formData.password));
//     console.log(formData);
//     setLoggedStatus(true);
//     console.log("user data after log in:", user)  // why it is still null after login ?

//   }
//   return (
//     <div className='w-full lg:h-[calc(100vh-3.5rem)] bg-richblack-900 lg:overflow-hidden'>
//       <div className='w-11/12 max-w-[1035px] min-h-[calc(100vh-3.5rem)] mx-auto flex justify-between items-center'>


//         <div className='w-[45%] lg:min-h-screen flex flex-col place-content-center'>
//           <div className='text-3xl text-white font-bold'>Join the millions learning to code with StudyNotion for free</div>
//           <div className='text-[14px] text-richblack-100'>Build skills for today, tomorrow, and beyond. Education to future-proof your career.</div>

//           <form onSubmit={submitHandler} className=''>
           
//             <div className='w-full flex flex-col mt-2'>
//               <label htmlFor='mail' className='text-sm text-richblack-5'>Email Address <sup className='requiredValue'>*</sup></label>
//               <input type='email' id='mail' name='mail' required value={formData.mail} onChange={changeHandler} placeholder='Enter email address' className='p-2 bg-richblack-800 rounded-md border-b-2 border-richblack-600'></input>
//             </div>

//             <div className='w-full flex flex-col mt-2'>
//                 <label htmlFor='password' className='text-sm text-richblack-5'>Password <sup className='requiredValue'>*</sup></label>
//                 <div className='w-full flex justify-between relative'>
//                   <input type={passwordType} id='password'  name='password' required value={formData.password} onChange={changeHandler} placeholder='Enter password' className='p-2 w-full rounded-md bg-richblack-800 border-b-2 border-richblack-600 ' ></input>
//                   <button onClick={passwordHandler} className='text-richblack-5 absolute right-3 top-3 z-10'>{passwordImage}</button>
//                 </div>
//                 <a  href='/forgotPassword' className='text-right text-sm text-[#47A5C5]'> forgot password ?</a>
//             </div>

//             <button type='submit' className='mt-8 rounded-md w-full py-3 text-xl flex place-content-center bg-yellow-50'>Sign in</button>

//           </form>
//         </div>

//         <div className='relative mx-auto w-11/12 max-w-[450px]  md:mx-0'>
//             <img src={ frame} alt='' width={558} height={504} className=''></img>
//             <img src={image} alt='' width={558} height={504} className= 'absolute -top-4 right-4 z-10'></img>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login

import React from 'react'
import Template from '../components/core/auth/Template'
import image from "../assets/Images/login.webp";

const Login = () => {
  return (
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={image}
      formType="login"
    />
  )
}

export default Login