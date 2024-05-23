import React, { Children } from 'react'
import { useSelector } from 'react-redux' 
import { Navigate } from "react-router-dom"


const PrivateRoute = ({children}) => {
    const { token }=useSelector ( (state)=>state.auth)

    if( token !==null){
        return children
    }
    else {
        return <Navigate to="/login" />
      }
  
}
// only logged in users will access these routes

export default PrivateRoute