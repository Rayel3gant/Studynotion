import React from 'react'
import { MdClose } from "react-icons/md";
import { SocialIcon } from 'react-social-icons';
import { MdOutlineContentCopy } from "react-icons/md"


const ShareModal = (props) => {
    const modalData=props.modalData;
    console.log(modalData)
  return (

    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className='w-11/12 max-w-[350px] flex flex-col gap-y-4 py-6 px-5 bg-richblack-5 rounded-md'>
        <div className='w-full flex justify-between'>
            <div>Share via</div>
            <button className='' onClick={modalData?.btn2Handler}><MdClose/></button>
        </div>

        <div className='w-full h-[1px] bg-richblack-800'></div>

        <div className='flex flex-wrap gap-3 place-content-center'>
            <SocialIcon network='whatsapp' url=''/>
            <SocialIcon network='discord' url=''/>
            <SocialIcon network='facebook' url=''/>
            <SocialIcon network='reddit' url=''/>
            <SocialIcon network='telegram' url=''/>
            <SocialIcon network='github' url=''/>
            <SocialIcon network='instagram' url=''/>
            <SocialIcon network='linkedin' url=''/>
        </div>

        {/* By default, pass the url of your social network, and the icon will be detected from the url. */}

        <div className='flex flex-col gap-y-3'>
            <input type='text' readOnly value={modalData.link} className='p-2 rounded-sm bg-richblack-300 text-sm border-b-2 border-richblue-900'/>
            <button onClick={modalData?.btn1Handler} className='px-3 py-2 bg-richblack-900 text-richblack-5 w-fit rounded-md self-center'>
                <div className='flex gap-x-2 items-center'>
                    <MdOutlineContentCopy/>
                    <div>Copy</div>
                </div>
            </button>
        </div>
      </div>
    </div>
  )
}

export default ShareModal