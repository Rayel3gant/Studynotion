// import React, { useState } from 'react'
// import data  from "../data/countrycode.json";
// import {BsEye} from "react-icons/bs"
// import {BsEyeSlash} from "react-icons/bs"
// import { useNavigate } from 'react-router-dom';
// //import { Toast } from 'react-toastify/dist/components';
// import image from "../assets/Images/signup.webp";
// import frame from "../assets/Images/frame.png";
// import { useDispatch, useSelector } from 'react-redux';
// import { sendOtp } from '../services/operations/authApi';
// import { ACCOUNT_TYPE } from "../utils/Constant"
// import { setSignupData } from '../redux/slices/authSlice';
// import { store }  from "../redux/store"
// //we have to insert the inner shadow in all input containers


// const Signup = (props) => {
//     const isLogged=props.isLogged;
//     const setLoggedStatus=props.setLoggedStatus;

//     const [formData,setFormData]=useState({FirstName:"",LastName:"",Email:"",ContactNo:"",Password:"",ConfirmPassword:""});
//     const [isStudent1,setStudentCheck1]=useState(true);
//     const [isStudent2,setStudentCheck2]=useState(false);
//     const [passwordType1,setPasswordType1] =useState("password");
//     const [passwordType2,setPasswordType2] =useState("password");
//     const [passwordImage1,setPasswordImage1]=useState( <BsEye/>);
//     const [passwordImage2,setPasswordImage2]=useState( <BsEye/>)
//     const  signupData  =useSelector( (state) => state.auth.signupData)

//     const navigate=useNavigate();
//     const dispatch=useDispatch();
//     const [AccountType,setAccountType]=useState(ACCOUNT_TYPE.STUDENT)
    
//     const accountTypeHandler1 = () =>{
//       setStudentCheck1(true);
//       setStudentCheck2(false);
//       setAccountType(ACCOUNT_TYPE.STUDENT)
//     }
//     const accountTypeHandler2 = () =>{
//       setStudentCheck2(true);
//       setStudentCheck1(false);
//       setAccountType(ACCOUNT_TYPE.INSTRUCTOR)
//     }
//     const changeHandler= (event) =>{
//       setFormData ( (prevFormData) =>{
//         return {
//           ...prevFormData,
//           [event.target.name]:event.target.value
//         }
//       })
      
//     }
//     const passwordHandler1= (event) =>{
//         event.preventDefault();
//         if(passwordType1==="password"){
//           setPasswordImage1(<BsEyeSlash/>);
//           setPasswordType1("text")
//         }
//         else{
//           setPasswordImage1(<BsEye/>);
//           setPasswordType1("password");
//         }
//     }

//     const passwordHandler2 =(event) =>{
//       event.preventDefault();
//         if(passwordType1==="password"){
//           setPasswordImage2(<BsEyeSlash/>);
//           setPasswordType2("text")
//         }
//         else{
//           setPasswordImage2(<BsEye/>);
//           setPasswordType2("password");

//         }
//     }
//     const submitHandler=(event) =>{
//       event.preventDefault();
//       console.log("formdata:",formData);
//       if(formData.Password !== formData.ConfirmPassword){
//         console.log("passwords do not match");
//        // Toast.error("Passwords don't match")
//         return;
//       }
//       //console.log("Welcome to studynotion");
//       //Toast.success("Sign up successful")

//       if(!isStudent1 && isStudent2){
//         setAccountType(ACCOUNT_TYPE.INSTRUCTOR)
//       }
//       const userSignUpData={
//         ...formData,
//         AccountType
        
//       }
//       console.log("user signup data", userSignUpData)

//       dispatch(setSignupData(userSignUpData));
//       console.log("sign up data set to :",signupData)


//       console.log("user mail:" ,formData.Email)
//       dispatch(sendOtp(formData.Email,navigate));   
      
//       setFormData({FirstName:"",LastName:"",Email:"",ContactNo:"",Password:"",ConfirmPassword:""})
//       setAccountType(ACCOUNT_TYPE.STUDENT)
//       setLoggedStatus(true);
      

//     }
//   return (
//     <div className='w-full bg-richblack-900 lg:overflow-hidden min-h-[calc(100vh-3.5rem)] '>
//       <div className='w-11/12 max-w-[1035px] mx-auto flex justify-between items-center'>

//         <div className='w-[45%] lg:min-h-screen flex flex-col place-content-center'>
//           <div className='text-3xl text-white font-bold'>Join the millions learning to code with StudyNotion for free</div>
//           <div className='text-[14px] text-richblack-100'>Build skills for today, tomorrow, and beyond. Education to future-proof your career.</div>

//           <form onSubmit={submitHandler} className=' gap-y-2'>
//             <div className='flex w-fit gap-x-5 py-1 px-5 rounded-full bg-richblack-800 my-2'>
//               <div className={` ${(isStudent1===true) ? ("bg-richblack-900 text-white"): (" bg-richblack-800")} p-2 rounded-full`} onClick={accountTypeHandler1}>Student</div>
//               <div  className={` ${(isStudent2===true) ? ("bg-richblack-900 text-white"): (" bg-richblack-800")} p-2 rounded-full`} onClick={accountTypeHandler2}>Instructor</div>
//             </div>

//             <div className='w-full flex justify-between'>
//               <div className='flex w-[45%] flex-col'>
//                 <label htmlFor='FirstName' className='text-sm text-richblack-5'>First Name <sup className='requiredValue'>*</sup> </label>
//                 <input type='text' id='FirstName' name='FirstName' required value={formData.FirstName} onChange={changeHandler} placeholder='Enter first name' className='p-2 bg-richblack-800 rounded-md border-b-2 border-richblack-600'></input>
//               </div>

//               <div className='flex w-[45%] flex-col'>
//                 <label htmlFor='LastName' className='text-sm text-richblack-5'>Last Name <sup className='requiredValue'>*</sup></label>
//                 <input type='text' id='LastName' name='LastName' required value={formData.LastName} onChange={changeHandler} placeholder='Enter last name' className='p-2 bg-richblack-800 rounded-md border-b-2 border-richblack-600'></input>
//               </div>

//             </div>

//             <div className='w-full flex flex-col mt-2'>
//               <label htmlFor='Email' className='text-sm text-richblack-5'>Email Address <sup className='requiredValue'>*</sup></label>
//               <input type='email' id='Email' name='Email' required value={formData.Email} onChange={changeHandler} placeholder='Enter email address' className='p-2 bg-richblack-800 rounded-md border-b-2 border-richblack-600'></input>
//             </div>

//             {/* we have to create a drop down menu here  */}
//             <div className='w-full flex justify-between mt-2'>  
//                 {/* <div>91</div> */}

//                 <div className='w-full flex flex-col'>
//                   <label htmlFor='ContactNo' className='text-sm text-richblack-5'>Phone Number <sup className='requiredValue'>*</sup></label>
//                   <input type='text' id='ContactNo' name='ContactNo' required value={formData.ContactNo} onChange={changeHandler} placeholder='Enter contact number' className='p-2 bg-richblack-800 rounded-md border-b-2 border-richblack-600'></input>
//                 </div>
                
//             </div>

//             <div className='w-full flex justify-between mt-2'>

//               <div className='flex flex-col w-[45%]'>
//                 <label htmlFor='Password' className='text-sm text-richblack-5'>Password <sup className='requiredValue'>*</sup></label>
//                 <div className='w-[45%] flex justify-between relative'>
//                   <input type={passwordType1} id='Password' minLength='8' name='Password' required value={formData.Password} onChange={changeHandler} placeholder='Enter password' className='p-2 rounded-md bg-richblack-800 border-b-2 border-richblack-600' ></input>
//                   <button onClick={passwordHandler1} className='absolute top-3 -right-24 z-10 text-richblack-5'>{passwordImage1}</button>
//                 </div>
//               </div>

//               <div className='flex flex-col w-[45%]'>
//                 <label htmlFor='ConfirmPassword' className='text-sm text-richblack-5'>Confirm Password <sup className='requiredValue'>*</sup></label>
//                 <div className='w-[45%] flex justify-between relative'>
//                   <input type={passwordType2} id='ConfirmPassword' minLength='8' name='ConfirmPassword' required value={formData.ConfirmPassword} placeholder='confirm password' onChange={changeHandler} className='p-2 bg-richblack-800 rounded-md border-b-2 border-richblack-600' ></input>
//                   <button onClick={passwordHandler2} className='absolute top-3 -right-24 z-10 text-richblack-5'> {passwordImage2}</button>
//                 </div>
//               </div>
//             </div>

//             <button type='submit' className='mt-8 rounded-md w-full py-3 text-xl flex place-content-center bg-yellow-50'>Create Account</button>
//           </form>
//         </div>

//         <div className='relative mx-auto w-11/12 max-w-[450px]  md:mx-0 '>
//             <img src={ frame} alt='' width={558} height={504}></img>
//             <img src={image} alt='' width={558} height={504} className= 'absolute -top-4 right-4 z-10'></img>
//         </div>
//       </div>
        
//     </div>
//   )
// }

// export default Signup


import React from 'react'
import Template from '../components/core/auth/Template'
import image from "../assets/Images/signup.webp";

const Signup = () => {
  return (
    <Template
      title="Join the millions learning to code with StudyNotion for free"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={image}
      formType="signup"
    />
  )
}

export default Signup