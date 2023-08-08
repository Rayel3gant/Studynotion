import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis";
import { setLoading ,setUser} from "../../redux/slices/profileSlice"
import { toast } from "react-toastify";
import { logout } from "./authApi";
const {
    GET_USER_DETAILS_API,
    GET_USER_ENROLLED_COURSES_API,
    GET_INSTRUCTOR_STATS
}=profileEndpoints


export async function getUserEnrolledCourses(token){
    let result=[]
    try{
        console.log("before caliing backend api for getting user enrollment courses")
        const response=await apiConnector("GET",GET_USER_ENROLLED_COURSES_API,null,
        {
            Authorization: `Bearer ${token}`,
        })

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        console.log("after caliing backend api for getting user enrollment courses")

        console.log("result",response.data.data)
        result=response.data.data
    }
    catch(error){
        console.log("get user enrolled courses API error")
        console.log(error)
    }
    return result;
}

export function getUserDetails(token, navigate) {
    
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
          Authorization: `Bearer ${token}`,
        })
        console.log("GET_USER_DETAILS API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        const userImage = response.data.data.image
          ? response.data.data.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
        dispatch(setUser({ ...response.data.data, image: userImage }))
      } catch (error) {
        dispatch(logout(navigate))
        console.log("GET_USER_DETAILS API ERROR............", error)
        toast.error("Could Not Get User Details")
      }
      toast.dismiss(toastId)
      dispatch(setLoading(false))
    }
  }
  export async function fetchInstructorStats(token){
    const toastId = toast.loading("Loading...")
    let result=[]
    try{
      const response=await apiConnector("GET",GET_INSTRUCTOR_STATS,null,{
        Authorization : `Bearer ${token}`
      })

      console.log("GET_INSTRUCTOR_STATS API RESPONSE.........",response);

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result=response.data
    } catch(error){
      console.error(error);
      console.log("GET_INSTRUCTOR_STATS API ERROR.........",error)
    }
    toast.dismiss(toastId)
    return result
  }
  