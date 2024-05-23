import React from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'

const CartCourses = () => {
    const { cart }=useSelector((state)=>state.cart)
  return (
    <div>
        {
            cart.map((courseData,index)=>{
                return (
                    <Card courseData={courseData} key={index}/>
                )
            })
        }
    </div>
  )
}

export default CartCourses