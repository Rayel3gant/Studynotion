import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ModalButton from '../../../common/ModalButton'
import { buyCourse } from '../../../../services/operations/paymentsAPI';
import { useNavigate } from 'react-router-dom';
import { BiRupee } from 'react-icons/bi';

const CartTotal = () => {
    const { total , cart}=useSelector((state)=>state.cart);
    const { token }=useSelector((state)=>state.auth);
    const { user} =useSelector((state)=>state.profile);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const buyHandler=()=>{
      const courses= cart.map((course,index)=>course._id)
      console.log("Bought these courses",courses)
      buyCourse(token, courses ,user, navigate, dispatch);
    }
  return (
    <div className='px-5 py-4 h-fit bg-richblack-700 border-2 border-richblack-800 rounded-md'>
        <div className='text-xm text-richblack-200'>Total:</div>
        <div className='flex items-center gap-x-2 text-2xl text-yellow-50 my-3'><BiRupee/> {total}</div>
        {/* <ModalButton text={"Buy Now"} onClick={buyHandler} customClasses={"w-full justify-center my-5"}/> */}
        <button className='px-3 py-2 bg-yellow-50 rounded-md w-fit' onClick={()=>buyHandler()}>Buy Now </button>
    </div>
  )
}

export default CartTotal