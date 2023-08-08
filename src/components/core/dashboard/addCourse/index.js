import UploadForm from "./UploadForm";
import UploadTips from "./UploadTips";

// for instructors only
export default function AddCourse (){
    return (
        <div >
            <div className="text-2xl text-richblack-5 mb-2">Add course</div>
            <div className="w-full flex justify-between">
                <div className="w-1/2">
                    <UploadForm/>
                </div>
                <div className="w-[40%]">
                    <UploadTips/>
                </div>
            </div>

        </div>
    )
}