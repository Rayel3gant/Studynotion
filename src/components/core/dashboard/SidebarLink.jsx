import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';

const SidebarLink = (props) => {
    const link=props.link;
    const iconName=link.icon;
    const Logo=Icons[iconName];
    const dispatch=useDispatch();
    const location=useLocation()

    const matchRoute= (route) =>{
        return matchPath({path:route}, location.pathname)
    }   



    
  return (
    <NavLink to={link.path} className={ `relative md:px-8 px-2 py-2 text-sm font-medium ${matchRoute(link.path) ? "bg-yellow-800" : "bg-opacity-0"}`}>
        <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path) ? "opacity-full":"opacity-0"}`}></span>
        <div className='flex gap-x-2 items-center'>
            <div className='text-lg'><Logo/></div>
            <div>{link.name}</div>
        </div>
    </NavLink>
  )
}

export default SidebarLink