import React, { useState } from 'react'
import { CgProfile } from "react-icons/cg" 
import { IoIosSettings} from "react-icons/io"
import { BiExit } from "react-icons/bi"
import { CgShoppingCart } from "react-icons/cg"
import { FaGraduationCap } from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authApi'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../common/Loader'
import SidebarLink from './SidebarLink'
import ConfirmationModal from '../../common/ConfirmationModal'


const Sidebar = () => {
    const { user , loading :profileLoading} =useSelector ( (state) => state.profile)
    const { loading:authLoading} =useSelector( (state) => state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [ConfirmationModalData,setModalStatus]=useState(null)
    

    if( profileLoading || authLoading){
        <Loader/>
    }
  return (
    <div className='min-w-[150px] md:min-w-[220px] min-h-[calc(100vh-3.5rem)] px-3 text-richblack-300 flex flex-col gap-y-5 bg-richblack-700 border-r-richblack-800 py-10'>
        
        <div className='flex flex-col'>
            {
                sidebarLinks.map( (link,index) =>{                   
                    if(link?.type && (link?.type ===user?.AccountType)){
                        return <SidebarLink link={link} key={index}/>
                    }
                    else return null                    
                })
            }
        </div>

        <div className='h-[2px] w-full bg-richblack-600'></div>

        <div className='flex flex-col gap-y-5'>
            <SidebarLink link={{name:"Settings" , path:"dashboard/settings" , icon:"VscSettingsGear"}}/>


            <button onClick={ ()=>setModalStatus({
                        text1:"Are You Sure?",
                        text2:"You will be logged out of your account",
                        btn1text:"Log out",
                        btn2text:"cancel",
                        btn1Handler: () => dispatch(logout(navigate)),
                        btn2Handler :() =>setModalStatus(null)
                    })}
                    className='text-sm font-medium flex gap-x-2 items-center pl-8'>               
                    <BiExit/>
                    <div>Log out</div>
            </button>
        </div>

             {/* modal visibility */}
        {ConfirmationModalData && <ConfirmationModal modalData={ConfirmationModalData}/>}
    </div>
  )
}

export default Sidebar