import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdDeleteOutline } from "react-icons/md"
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../services/operations/authApi'
import ConfirmationModal from '../../common/ConfirmationModal'
import UpdatePic from './settings/UpdatePic'
import UpdateProfile from './settings/UpdateProfile'
import UpdatePassword from './settings/UpdatePassword'

const Settings = () => {
  const { user } =useSelector( (state) =>state.profile)
  const [ConfirmationModalData,setModalStatus]=useState(null)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  return (
    <div className='w-full px-4 lg:px-20 flex flex-col gap-y-5'>
      <div className='text-3xl text-richblack-5 font-bold'>Edit Profile</div>

      <UpdatePic/>

      <UpdateProfile/>

      <UpdatePassword/>

      <div className='w-full flex gap-x-5 bg-pink-900 px-4 py-6 rounded-md mt-10'>
          <div className='bg-pink-700 text-pink-200 text-2xl w-[60px] h-[50px] flex justify-center items-center rounded-full'><MdDeleteOutline/></div>
          <div>
            <div>Delete Account</div>
            <div>would you like to delete your account?</div>
            <div>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</div>
            <button onClick={ ()=>setModalStatus({
                        text1:"Are You Sure?",
                        text2:"You will be deleting your account",
                        btn1text:"DELETE",
                        btn2text:"cancel",
                        btn1Handler: () => dispatch(logout(navigate)),
                        btn2Handler :() =>setModalStatus(null)
                    })} className='text-pink-300 italic'>I want to delete my account.</button>
          </div>
        </div>

        {ConfirmationModalData && <ConfirmationModal modalData={ConfirmationModalData}/>}

    </div>
  )
}

export default Settings