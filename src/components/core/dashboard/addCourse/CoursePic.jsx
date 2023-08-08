import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const CoursePic = (props) => {
    const name=props.name;
    const label=props.label;
    const register=props.register;
    const setValue=props.setValue;
    const getValues=props.getValues;
    const errors=props.errors;

    const [image,setImage]=useState(null);
    const [imageStatus,setImageStatus]=useState(false);
    useEffect( ()=>{
        register(name,{required:true})
    },[]);
    const changeHandler=(event)=>{
        setImage(event.target.files[0]);
        setImageStatus(true);
    }
    const submitHandler=()=>{
        
    }
  return (
    <div>
        <label htmlFor={name} className='text-sm text-richblack-5'>{label}<sup className='requiredValue'>*</sup></label>
        <div className='bg-richblack-700 w-full flex flex-col gap-y-3 justify-center items-center py-5 rounded-md'>
            <input type='file' name={name} onChange={changeHandler} className=''></input>
            {
                imageStatus ? (
                    <div className='flex flex-col text-xs text-richblack-5 gap-y-1'>
                        <p>Filename: {image.name}</p>
                        <p>Filetype: {image.type}</p>
                        <p>Size in bytes: {image.size}</p>
                        <p>
                            lastModifiedDate:{' '}
                            {image.lastModifiedDate.toLocaleDateString()}
                        </p>
                    </div>
                ) : (<div>
                        <div>Aspect ratio 16:9</div>
                        <div>Recommended size 1024 * 576</div>
                    </div>)
            }
            <button onClick={submitHandler} className='text-yellow-50'>Submit</button>
            {
                errors[name] && <span>Provide valid course thumbnail</span>
            }
        </div>
    </div>
  )
}

export default CoursePic