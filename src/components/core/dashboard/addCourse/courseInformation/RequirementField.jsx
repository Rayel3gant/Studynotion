import React, { useEffect, useState } from 'react'

const RequirementField = (props) => {
    const name=props.name;
    const label=props.label;
    const register=props.register;
    const setValue=props.setValue;
    const getValues=props.getValues;
    const errors=props.errors;
    const [requirement,setRequirement]=useState("");
    const [requirementList,setRequirementList]=useState([]);

    const addRequirement=()=>{
        console.log("adding course instruction")

        if(requirement){
            setRequirementList([...requirementList,requirement]);
            setRequirement("");
        }
    }
    const removeRequirement=(index)=>{
        const updatedRequirementList=[...requirementList];
        updatedRequirementList.splice(index,1);
        setRequirementList(updatedRequirementList);
        console.log("removing course instruction")


    }
    useEffect( ()=>{
        register(name,{required:true})
    },[]);
    useEffect(()=>{
        setValue(name,requirementList)
    },[requirementList]);
  return (
    <div className='flex flex-col gap-y-1'>
        <label className='text-sm text-richblack-5' htmlFor={name}>{label}<sup className='requiredValue'>*</sup></label>
        <div className='flex flex-col'>
            <input type='text' id={name} value={requirement}  onChange={(e)=>setRequirement(e.target.value)} className='rounded-md bg-richblack-700 p-3'></input>
            <button type='button' className=' text-yellow-50 text-left' onClick={addRequirement}> Add</button>

        </div>

        {
            (requirementList.length > 0)   ? (requirementList.map( (instruction,index)=>{
                return (
                    <div key={index} className='flex gap-x-2 text-richblack-5'>
                        <div>{instruction}</div>
                        <button onClick={()=>removeRequirement(index)}>clear</button>
                    </div>
                )
            })) : (<div></div>)
        }
        {
            errors[name] && (<span>{label} is required</span>)
        }
    </div>
  )
}

export default RequirementField