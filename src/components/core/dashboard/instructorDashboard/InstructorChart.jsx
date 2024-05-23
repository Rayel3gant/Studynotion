import React from 'react'
import { useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';
Chart.register(...registerables);

const InstructorChart = (props) => {
    const data=props.data;
    const [studentChartVisible,setChartVisibility]=useState(true);

    const generateRandomColors=(totalColors)=>{
        let colors=[]
        for(let i=0;i<totalColors;i++){
            const tempColor=`rgb( ${Math.floor(Math.random()*256)} , ${Math.floor(Math.random()*256)} , ${Math.floor(Math.random()*256)})`;
            colors.push(tempColor)
        }
        return colors;
    }

    // create chart data for students

    const studentsChartData={
        labels:data.map((course)=>course.CourseTitle),
        datasets:[
            {
                data:data.map((course)=>course.totalStudentsEnrolled),
                backgroundColor:generateRandomColors(data.length)
            }
        ]
    }


    const incomeChartData={
        labels:data.map((course)=>course.CourseTitle),
        datasets:[
            {
                data:data.map((course)=>course.totalIncome),
                backgroundColor:generateRandomColors(data.length)
            }
        ]
    }

    const options={
        maintainAspectRatio: false
    }

  return (
    <div>
        <div className='text-lg text-richblack-50'>Visualize</div>

        <div className='flex gap-x-3'>
            <button className={`p-2 w-fit rounded-md ${studentChartVisible ? ("text-yellow-50 bg-richblack-600"):(" bg-richblack-900 text-richblack-5")}`} onClick={()=>setChartVisibility(true)}>Students</button>

            <button className={`p-2 w-fit rounded-md ${ !studentChartVisible ? ("text-yellow-50 bg-richblack-600"):(" bg-richblack-900 text-richblack-5")}`} onClick={()=>setChartVisibility(false)}>Income</button>
        </div>


        <div className='relative mx-auto aspect-square h-full w-full'>
            <Pie
                data={ studentChartVisible ? studentsChartData : incomeChartData}
                options={options}
                
            />
        </div>

        
    </div>
  )
}

export default InstructorChart