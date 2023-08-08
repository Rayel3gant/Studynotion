import { useSelector } from "react-redux"
import Card from "./Card";
import ModalButton from "../../../common/ModalButton"

export default function MyCourses(){
    const { user } =useSelector((state)=>state.profile);
    const createNewCoursesHandler=()=>{
        
    }
    return (
        <div>
            <div>
                <div>My courses</div>
                <ModalButton text={"New"} onClick={createNewCoursesHandler}/>
            </div>
            {
                user?.Courses.length > 0 ? (
                    <div>
                        <div className="flex">
                            <div>COURSES</div>
                            <div>DURATION</div>
                            <div>PRICE</div>
                            <div>ACTIONS</div>
                        </div>
                        {
                            user?.Courses.map((course,index)=>{
                                return (
                                    <Card course={course} key={index}/>
                                )
                            })
                        }
                    </div>
                ) :(
                    <div>You have not published any courses till now.</div>
                )
            }

        </div>
    )
}