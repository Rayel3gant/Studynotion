import React from 'react'
import ModalButton from './ModalButton';

const ConfirmationModal = (props) => {
    const modalData=props.modalData;
    console.log(modalData)
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className='w-11/12 max-w-[350px] flex flex-col gap-y-4 py-6 px-5 bg-richblack-800 rounded-md'>
        <div>{modalData.text1}</div>
        <div>{modalData.text2}</div>

        <div className='flex w-full justify-between'>
            <ModalButton onclick={modalData?.btn1Handler} text={modalData?.btn1text}/>

            <button onClick={modalData?.btn2Handler}>{modalData?.btn2text}</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal