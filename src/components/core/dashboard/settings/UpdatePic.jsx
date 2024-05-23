import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { MdFileUpload } from 'react-icons/md';
import { useRef } from 'react';
import { updateDisplayPicture } from '../../../../services/operations/settingsAPI';
import { useEffect } from 'react';

const UpdatePic = () => {
    const { token } =useSelector((state)=>state.auth);
    const { user }=useSelector((state)=>state.profile);
    const [loading ,setLoading]=useState(false)
    const fileInputRef=useRef(null)
    const [imageFile, setImageFile] = useState(null)
    const dispatch=useDispatch()
    const [previewSource, setPreviewSource] = useState(null)


    const handleFileUpload=async()=>{
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("image", imageFile)
            // console.log("formdata", formData)
            dispatch(updateDisplayPicture(token, formData))
            // console.log("update profile picture result",result)
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
        setLoading(false)
    }

    const handleClick=()=>{
        fileInputRef.current.click()
    }

    const handleFileChange=(e)=>{
        const file=e.target.files[0]
        console.log(file)
        if (file) {
            setImageFile(file)
            previewFile(file)

        }
    }

    const previewFile=(file)=>{
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    useEffect(() => {
        if (imageFile) {
          previewFile(imageFile)
        }
      }, [imageFile])


  return (
    <div className='w-full bg-richblack-800 rounded-md px-4 py-5 border-[1px] border-richblack-700'>
        <div className='flex gap-x-3 items-center'>
            <img src={previewSource || user.Image} alt='' className='w-[70px] h-[70px] rounded-full'/>
            <div className='flex flex-col gap-y-1'>
                <div className='text-lg font-semibold text-richblack-5'>Change Profile Picture</div>

                <div className="flex flex-row gap-3 items-center">
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/png, image/gif, image/jpeg"/>
                    
                    <button onClick={handleClick} disabled={loading} className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50">Select</button>
                    
                    <button onClick={handleFileUpload} className='bg-yellow-50 p-2 w-fit font-semibold flex gap-x-2 items-center rounded-md '>
                        {!loading && (<MdFileUpload  className="text-lg text-richblack-900" />)} 
                        {`${loading ? "Uploading..." : "Upload"}`}
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdatePic