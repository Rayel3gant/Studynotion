import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import  Home  from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useState } from "react";
import ForgotPassword from "./pages/ForgotPassword";
import ResendMail from "./pages/ResendMail";
import ResetComplete from "./pages/ResetComplete";
import SetNewPassword from "./pages/SetNewPassword"
import VerifyMail from "./pages/VerifyMail";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/auth/OpenRoute"
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import MyProfile from "../src/components/core/dashboard/MyProfile"
import PrivateRoute from "./components/core/auth/PrivateRoute"
import Dashboard from "../src/pages/Dashboard"
import NotFound from "../src/pages/NotFound"
import Settings from "./components/core/dashboard/Settings";
import EnrolledCourses from "./components/core/dashboard/EnrolledCourses";
import Cart from "./components/core/dashboard/cart";
import { ACCOUNT_TYPE } from "./utils/Constant";
import { useSelector } from "react-redux";
import MyCourses from "./components/core/dashboard/MyCourses";
import AddCourse from "./components/core/dashboard/addCourse";
import EditCourse from "./components/core/dashboard/editCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/viewCourse/VideoDetails";
import InstructorStats from "./components/core/dashboard/instructorDashboard/InstructorStats";

function App() {
  const navigate=useNavigate();
  const [isLogged,setLoggedStatus]=useState((false));
  const { user } =useSelector( (state) =>state.profile)

  const logOutHandler= () => {
    navigate("/");
    setLoggedStatus(false);
  }
  return (
    

    <div className="w-full min-h-screen flex flex-col bg-richblack-900 font-inter">
    <Navbar/>
      <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/signup" element={<OpenRoute><Signup isLogged={isLogged} setLoggedStatus={setLoggedStatus} /></OpenRoute>}/>
          <Route path="/login" element={<OpenRoute><Login isLogged={isLogged} setLoggedStatus={setLoggedStatus} /></OpenRoute>}/>
          <Route path="/forgotPassword" element={<OpenRoute><ForgotPassword/></OpenRoute>}/>             //open route means only logged out users will access it
          <Route path="/resendMail" element={<OpenRoute><ResendMail/></OpenRoute>} />
          <Route path="resetComplete" element={<OpenRoute><ResetComplete/></OpenRoute>} />
          <Route path="/setNewPassword/:id" element={<OpenRoute><SetNewPassword/></OpenRoute>} />
          <Route path="/verifyMail" element={<OpenRoute><VerifyMail/></OpenRoute>} />
          <Route path="/aboutus" element={<About/>} />
          <Route path="/contactus" element={<ContactUs/>}></Route>
          <Route path="/catalog/:catalogName" element={<Catalog/>}/>
          <Route path="/course/:courseId" element={<CourseDetails/>}/>


          <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>
            <Route path="/dashboard/my-profile" element={<MyProfile/>}></Route>
            <Route path="/dashboard/settings" element={<Settings/>}></Route>
            
            {
              user?.AccountType===ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route path="/dashboard/enrolledCourses" element={<EnrolledCourses/>}/>
                  <Route path="/dashboard/cart" element={<Cart/>}/>
                </>
              )
            }
            {
              user?.AccountType===ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                  <Route path="/dashboard/myCourses" element={<MyCourses/>}/>
                  <Route path="/dashboard/addCourse" element={<AddCourse/>}/>
                  <Route path="/dashboard/editCourse/:courseId" element={<EditCourse/>}/>
                  <Route path="/dashboard/myStats" element={<InstructorStats/>}/>

                </>
              )
            }

          </Route>

          <Route element={<PrivateRoute><ViewCourse/></PrivateRoute>}>
          {
            user?.AccountType===ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="viewCourse/:courseId/section/:sectionId/subsectionId/:subsectionId" element={<VideoDetails/>}/>
              </>
            )
          }

          </Route>

          
          <Route path="*" element={<NotFound/>}></Route>

      </Routes>

    </div>

    


  );
}

export default App;
