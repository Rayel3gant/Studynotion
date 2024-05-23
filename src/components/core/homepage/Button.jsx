import React from 'react'
import { Link } from 'react-router-dom';

const Button = ({children , active , link}) => {
  return (
    <Link to={link}>
        <div className={`px-3 py-2 rounded-md  font-bold hover:scale-95 transition-all duration-200 ${active ?"bg-yellow-50 text-black" :"bg-richblack-800"} `}>
            {children}
        </div>
    </Link>
  )
}
export default Button;
