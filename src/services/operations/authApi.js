

import { toast } from "react-toastify"

import { setLoading, setToken } from "../../redux/slices/authSlice"
import { resetCart } from "../../redux/slices/cartSlice"
import { setUser } from "../../redux/slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../apis"
import { useSelector } from "react-redux"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints

export function sendOtp(mail, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {

      console.log("here 1")
      console.log("sending otp to :",mail)
      const response = await apiConnector("POST", SENDOTP_API, {
        userMail:mail
        //checkUserPresent: true,
      })
      //console.log("here 2")
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      //console.log("here 3")

      toast.success("OTP Sent Successfully")
      console.log("move to verify mail route now")
      navigate("/verifyMail");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signup(
  FirstName, LastName ,Email , ContactNo,Password ,ConfirmPassword, AccountType ,otp,navigate
 
) {
  console.log("accessing otp:",otp)
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        AccountType:AccountType,
        FirstName:FirstName,
        LastName:LastName,
        Email:Email,
        Password:Password,
        ConfirmPassword:ConfirmPassword,
        ContactNo:ContactNo,
        otp:otp
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function login(Email, Password, navigate) {
  
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        Email,
        Password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      const userImage = response.data?.user?.Image
        ? response.data.user.Image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.FirstName}${response.data.user.LastName}`
      dispatch(setUser({ ...response.data.user, image: userImage }))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))

      
      // we are storing user details in local storage because after refresh ,
      //  it is again set to null , then all the profile data becomes undefined

      console.log("moving to profile page")
      navigate("/dashboard/my-profile ")
    } 
    catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    console.log("user logged out")
    navigate("/")
    console.log("user logged out")
  }
}



export function getPasswordResetToken(email , setMailStatus) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      console.log(email)
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {Email:email})
      console.log("after sending mail")


      console.log("RESET PASSWORD TOKEN RESPONSE....", response);

      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setMailStatus(true);
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Failed to send email for resetting password");
    }
    dispatch(setLoading(false));
  }
}

export function resetPassword(password, confirmPassword, token) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", RESETPASSWORD_API, {password:password, confirmPassword:confirmPassword, token:token});

      console.log("RESET Password RESPONSE ... ", response);


      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
    }
    dispatch(setLoading(false));
  }
}

