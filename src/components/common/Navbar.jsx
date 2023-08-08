import React, { useEffect, useState } from 'react';
import  linkData  from "../../data/navbar-links";
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from "react-icons/ai"
import ProfileDropDown from '../core/auth/ProfileDropDown';
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import { MdKeyboardArrowDown} from "react-icons/md";
import { ACCOUNT_TYPE} from "../../utils/Constant"

const Navbar = () => {
    const {token} = useSelector( (state) => state.auth );
    const {user} = useSelector( (state) => state.profile );
    const {totalItems} = useSelector( (state) => state.cart );
    const navigate=useNavigate();

    // we will call api to get all category present in backend ,button => api call service => backend controller  => response
    
    const [subLinks,setSubLinks]=useState([]);
    const getSubLinks =async() =>{
        try{
            const response =await apiConnector("GET",categories.CATEGORIES_API);
            setSubLinks(response.data.data);
        }
        catch(error){
            console.log(error);
            console.log("can not get category data")
        }
    }
    useEffect( ()=>{
        getSubLinks();
    },[])

  return (
    <div className='w-full bg-richblack-900 border-b-[1px] border-richblack-700'>

        <div className='w-11/12 max-w-[1035px] mx-auto flex justify-between py-3'>
            <Link to={"/"} className='invisible md:visible'>
                <img src={logo} alt=''></img>
            </Link>

            <div className='flex gap-x-3 items-center text-richblack-25'>
            {
                linkData.map( (link,index) =>(
                    
                    (link.title==="Catalog") ? 
                    (<div key={index} className=' relative flex gap-x-1 items-center group' >
                        {link.title} 
                       <MdKeyboardArrowDown/>

                       <div className='absolute p-3 z-10  translate-x-[-50%] translate-y-[20%] invisible left-1/2 top-1/2 flex flex-col rounded-md bg-richblack-5 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]'>
                            <div className='absolute left-1/2 top-0 h-6 w-6 bg-richblack-5  rotate-45 translate-x-5 translate-y-[-20%]'>
                            </div>
                            {
                                subLinks.length ? 
                                ( subLinks.map( (link,index) =>(
                                    <Link to={`/catalog/${link.Category.split(" ").join("-").toLowerCase()}`}
                                        className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                        key={index}
                                    >
                                        <p>{link.Category}</p>
                                    </Link>
                                )))  : (<div></div>)
                            }
                       </div>
                    </div>) 
                    :(<NavLink key={index} to={link.path}>{link.title}</NavLink>)
                    
                ))
            }
            </div>

            <div className='flex gap-x-3 text-richblack-25 items-center'>
                {
                    user && user?.AccountType !==ACCOUNT_TYPE.INSTRUCTOR &&(
                        <button className='relative' onClick={ ()=>navigate("/dashboard/cart")}>
                            <AiOutlineShoppingCart className='text-xl'/>
                            {
                                  <span className='absolute -top-2 -right-1 bg-caribbeangreen-200 animate-bounce text-xs w-[15px] h-[15px] rounded-full flex place-content-center'>{totalItems}</span>
                            }
                        </button>
                    )
                }

                {
                    token === null && (
                        <button className='px-3 py-2 bg-richblack-800 rounded-md border border-richblack-700' onClick={ ()=> navigate("/login")}>Log in</button>
                    )
                }
                {
                    token=== null && (
                        <button className='px-3 py-2 bg-richblack-800 rounded-md border border-richblack-700' onClick={()=> navigate("/signup")}>Sign up</button>
                    )
                }
                {
                    token !== null && ( <ProfileDropDown/>)
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar