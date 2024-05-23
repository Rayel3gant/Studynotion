import React, { useEffect, useState } from 'react';
import  linkData  from "../../data/navbar-links";
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, NavLink, useNavigate,matchPath, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import ProfileDropDown from '../core/auth/ProfileDropDown';
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import { MdKeyboardArrowDown} from "react-icons/md";
import { ACCOUNT_TYPE} from "../../utils/Constant"

import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import { logout } from '../../services/operations/authApi';
import { BsChevronDown} from "react-icons/bs"


const Navbar = () => {
    const {token} = useSelector( (state) => state.auth );
    const {user} = useSelector( (state) => state.profile );
    const {totalItems} = useSelector( (state) => state.cart );
    const navigate=useNavigate();
    const location=useLocation()
    const [loading, setLoading] = useState(false)
    const dispatch=useDispatch()
    const [subLinks,setSubLinks]=useState([]);


    // we will call api to get all category present in backend ,button => api call service => backend controller  => response
    
    const getSubLinks =async() =>{
        setLoading(true)
        try{
            const response =await apiConnector("GET",categories.CATEGORIES_API);
            console.log(response.data.data)
            setSubLinks( response?.data?.data)
        }
        catch(error){
            console.log(error);
            console.log("can not get category data")
        }
        setLoading(false)
    }
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }
    
    useEffect( ()=>{
        getSubLinks();
        console.log(subLinks.length)
    },[])


 

  return (
    <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${location.pathname !== "/" ? "bg-richblack-800" : ""} transition-all duration-200`}>

        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

            <Link to={"/"} className=''>
                <img src={logo} alt="Logo" width={160} height={32} loading="lazy"/>
            </Link>

            <nav className="hidden md:block">
                <ul className="flex gap-x-6 text-richblack-25">
                    {linkData.map((link, index) => (
                    <li key={index}>
                        {link.title === "Catalog" ? (
                        <>
                            <div className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName")? "text-yellow-25": "text-richblack-25"}`}>
                                <p>{link.title}</p>
                                <MdKeyboardArrowDown/>
                                <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                                    <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                    {loading ? (
                                    <p className="text-center">Loading...</p>
                                    ) : (subLinks.length === 0) ? (
                                        <p className="text-center">No Courses Found</p>                                      
                                    ) : (
                                    <>
                                        {subLinks?.map((link, i) => (                                         
                                            <Link to={`/catalog/${link.Category.split(" ").join("-").toLowerCase()}`}
                                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                key={i}
                                            >
                                                <p>{link.Category}</p>
                                            </Link>
                                            
                                        ))}
                                    </>
                                    )}
                                </div>
                            </div>
                        </>
                        ) : (
                        <Link to={link?.path}>
                            <p className={`${matchRoute(link?.path)? "text-yellow-25": "text-richblack-25"}`}>
                                {link.title}
                            </p>
                        </Link>
                        )}
                    </li>
                    ))}
                </ul>
            </nav>

           


            <div className="hidden items-center gap-x-4 md:flex">
                {user && user?.AccountType !== ACCOUNT_TYPE.INSTRUCTOR && (

                    <Link to="/dashboard/cart" className="relative">
                    <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                    {totalItems > 0 && (
                        <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                        {totalItems}
                        </span>
                    )}
                    </Link>
                )}
                

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
                {token !== null && <ProfileDropDown/>}
            </div>

            <div className="mr-4 md:hidden ">
                <Menu  menuButton={<MenuButton><AiOutlineMenu fontSize={24} fill="#AFB2BF" /></MenuButton>} transition menuClassName="menu" >
                    {
                        user && user?.AccountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                            <MenuItem>
                                <Link to="/dashboard/cart"/>
                            </MenuItem>
                        )
                    }

                    {
                        token === null && (
                            <MenuItem>
                                <Link to="/login">Log In</Link>
                            </MenuItem>
                        )
                    }
                    {
                        token===null && (
                            <MenuItem>
                                <Link to="/signup">Sign Up</Link>
                            </MenuItem>
                        )
                    }
                    {
                        token !==null && (
                            <MenuItem>
                                <Link to="/dashboard/my-profile">My Profile</Link>
                            </MenuItem>
                        )
                    }

                    

                    {
                        linkData.map((link,index)=>(
                            <div key={index}>
                                { link.title === "Catalog" ? (
                                    <>
                                        <SubMenu label="Catalog">

                                            {
                                                subLinks?.length ? (
                                                    <>
                                                    {
                                                        subLinks?.map((link,i)=>(
                                                            <MenuItem>
                                                                <Link key={i} to={`/catalog/${link.Category.split(" ").join("-").toLowerCase()}`}>{link.Category}</Link>
                                                            </MenuItem>
                                                        ))
                                                    }                          
                                                    </>
                                                    
                                                ) : ( <div className='p-3'>no courses found</div>)
                                            }  
                                            
                                        </SubMenu>
                                    </>
                                ) : (
                                    <MenuItem>
                                        <Link to={link?.path}>
                                            {link.title}
                                        </Link>
                                    </MenuItem>
                                )}
                            </div>
                        ))
                    }

                    {
                        token!=null && (
                            <MenuItem onClick={()=>dispatch(logout(navigate))}>
                                Log Out
                            </MenuItem>
                        )
                    }

                </Menu>
            </div>
        </div>
    </div>
  )
}

export default Navbar