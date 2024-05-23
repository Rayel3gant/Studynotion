import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ModalButton from "../../common/ModalButton"

const MyProfile = () => {
  const navigate=useNavigate();
  const { user } =useSelector( (state)=>state.profile);
  const aboutText= user.AdditionalDetails.About || "write something about yourself"
  return (
    <div>
        <div className='w-full lg:px-20 px-4 flex flex-col gap-y-5'>
            <div className='text-3xl text-richblack-5 font-bold'>My Profile</div>

            <div className='w-full flex justify-between bg-richblack-700 py-4 px-5 pr-12'>
                <div className='flex flex-col md:flex-row gap-4'>
                    <div> 
                        <img className='aspect-square rounded-full object-cover h-[80px] w-[80px]' src={user?.Image} alt={`profile- ${user?.FirstName}`}/> 
                    </div>

                    <div>
                        <div className='text-xl text-richblack-5'>{user?.FirstName +" "+user?.LastName}</div>
                        <div className='text-sm text-richblack-300'>{user?.Email}</div>
                    </div>
                </div>

                <ModalButton text={"Edit"} onClick={()=>navigate("/dashboard/settings")} />
            </div>

            <div className='w-full flex justify-between bg-richblack-700 py-4 px-5 pr-12'>
                <div>
                    <div className='text-xl text-richblack-5'>About</div>

                    <div>{aboutText}</div>
                </div>


                <ModalButton text={"Edit"} onClick={()=>navigate("/dashboard/settings")} />
            </div>

            <div className='w-full flex flex-col gap-y-5  justify-between bg-richblack-700 py-4 px-5 pr-12'>
                <div className='flex justify-between'>
                    <div className='text-xl text-richblack-5'>Personal Details</div>
                    <ModalButton  text={"Edit"} onClick={()=>navigate("/dashboard/settings")} />

                </div>

                <div className='grid grid-rows-6 grid-cols-1 md:grid-cols-2 md:grid-rows-3 gap-x-32 gap-y-8'>
                    <div>
                        <div className='text-sm text-richblack-600'>First name</div>
                        <div className='text-sm text-richblack-5'>{user.FirstName ?? "null"}</div>
                    </div>

                    <div >
                        <div className='text-sm text-richblack-600'>Last Name</div>
                        <div className='text-sm text-richblack-5'>{user.LastName ?? "null"}</div>
                    </div>

                    <div>
                        <div className='text-sm text-richblack-600'>Email</div>
                        <div className='text-sm text-richblack-5'>{user.Email ?? "null"}</div>
                    </div>

                    <div>
                        <div className='text-sm text-richblack-600'>Phone no</div>
                        <div className='text-sm text-richblack-5'>{user.ContactNo ?? "null"}</div>
                    </div>

                    <div>
                        <div className='text-sm text-richblack-600'>Gender</div>
                        <div className='text-sm text-richblack-5'>{user.AdditionalDetails.Gender ??"null"}</div>
                    </div>

                    <div>
                        <div className='text-sm text-richblack-600'>Date of Birth</div>
                        <div className='text-sm text-richblack-5'>{user.AdditionalDetails.DoB ??"null"}</div>
                    </div>

                </div>
            </div>

        <div>
           



        </div>
    </div>
    </div>
  )
}

export default MyProfile