import UploadForm from "./UploadForm";
import UploadTips from "./UploadTips";

// for instructors only
export default function AddCourse (){
    return (
        <div >
            <div className="text-2xl text-richblack-5 mb-2">Add course</div>
            <div className="w-full flex flex-col lg:flex-row gap-8 justify-between">
                <div className="lg:w-1/2 w-full px-4">
                    <UploadForm/>
                </div>
                <div className="lg:w-[40%] w-full px-4">
                    <UploadTips/>
                </div>
            </div>

        </div>
    )
}