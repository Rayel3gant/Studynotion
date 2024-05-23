import React from 'react'
import { BiRightArrowAlt } from "react-icons/bi";
import HighlightText from './HighlightText';
import Button from './Button';
import { TypeAnimation } from 'react-type-animation';
import CircularGradient from './CircularGradient';

const Codeblocks = (props) => {
    const heading=props.heading;
    
    const para=props.para;
    const buttonText1=props.buttonText1;
    const buttonText2=props.buttonText2;
    const code=props.code;
    const bgGradient=props.bgGradient;
    const codeColor=props.codeColor;
    const flexDirection=props.flexDirection;
    const active1=props.active1;
    const active2=props.active2;
    const link1=props.link1;
    const link2=props.link2;


  return (
    <div className={`flex flex-col gap-y-5 md:flex-row justify-between w-full  ${flexDirection} `}>

        <div className='md:w-[45%] w-full flex flex-col gap-y-4  '>
            <div className='text-3xl'> {heading}</div>
            

            <div className='text-[16px]'>{para}</div>

            <div className='flex  gap-x-6 mt-7'>
                <Button  active={active1} link={link1}> <div className='flex  items-center gap-x-2'>{buttonText1} <BiRightArrowAlt/></div></Button>
                <Button active={active2} link={link2}> {buttonText2}</Button>
            </div>
        </div>


        <div className='md:w-[45%] w-full  flex gap-x-4 text-xs relative'>
            {bgGradient}
            <div className='w-[7%] text-richblack-200 absolute z-10'>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
                <div>10</div>
                <div>11</div>

            </div>

            <div className={`${codeColor} font-mono font-bold absolute z-10 left-5`}>
                <TypeAnimation
                    sequence={[code,1000,""]}
                    wrapper="span"
                    cursor={true}
                    repeat={Infinity}
                    style={{  display: 'block' ,whiteSpace:'pre-line' }}
                    omitDeletionAnimation={true}
                />
            </div>

            {/* <CircularGradient/> */}
        </div>
    </div>
  )
}

export default Codeblocks