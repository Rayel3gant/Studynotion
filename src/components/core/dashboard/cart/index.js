import { useSelector } from "react-redux"
import CartCourses from "./CartCourses"
import CartTotal from "./CartTotal"

export default function Cart(){
    const { totalItems ,total }=useSelector((state)=>state.cart)
    return (
        <div>
            <div className="text-sm text-richblack-300">{`Home / Dashboard / `} <span className="text-yellow-50">Wishlist</span></div>
            <div className="text-3xl text-richblack-5 my-5">My Wishlist</div>

            <div className="text-lg text-richblack-400 my-6">{totalItems} courses in cart</div>
            <div className="w-full">
                <div className="h-[1px] w-full bg-richblack-700"></div>
                {
                    (totalItems>0 ?
                    (<div className="flex justify-between my-5">
                        <div className="w-[75%]"><CartCourses/></div>
                        <div className="w-[20%]"><CartTotal/></div>
                    </div>):
                    (<div className="flex w-full place-content-center text-3xl text-richblack-5 my-8">Cart is empty!!!</div>))
                }
            </div>
        </div>
    )
}