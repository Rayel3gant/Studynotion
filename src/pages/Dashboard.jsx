import React from 'react'
import { useSelector } from 'react-redux'
import Loader from '../components/common/Loader'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/dashboard/Sidebar'

const Dashboard = () => {

    const { loading : authLoading}= useSelector ( (state) => state.auth)
    const { laoding : profileLoading} =useSelector ( (state) => state.profile)

    if( authLoading || profileLoading){
        <Loader/>
    }
  return (
    <div className='flex max-w-full min-h-[calc(100vh-3.5rem)]'>
        <Sidebar/>
        <div className='min-h-[calc(100vh-3.5rem)] w-11/12 max-w-[900px] mx-auto overflow-auto'>
            <div className='mx-auto py-10'>
                <Outlet/>
            </div>
        </div>

    </div>
  )
}

export default Dashboard