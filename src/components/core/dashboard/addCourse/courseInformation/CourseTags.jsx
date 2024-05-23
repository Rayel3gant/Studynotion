// import React from 'react'
// import { useState } from 'react';

// import { WithContext as ReactTags } from "react-tag-input"
// import Suggestions from '../../../../../data/Suggestion';
// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';


// const CourseTags = (props) => {
//     const name=props.name;
//     const label=props.label;
//     const register=props.register;
//     const setValue=props.setValue;
//     const getValues=props.getValues;
//     const errors=props.errors;
//     const className=props.className;
//     // const suggestions = Suggestions.map((index,tag)=> {
//     //     return {
//     //       id: index,
//     //       tag: tag
//     //     };
//     // });

//     const { course , editCourse}=useSelector( (state)=>state.course)

//     const [tags,setTags]=useState([]);
//     const deleteHandler=(index)=>{
//         setTags(tags.filter((tag,i)=> i!== index))
//     }
//     const addHandler=(tag)=>{
//         setTags([...tags,tag])
//     }
//     const KeyCodes = {
//         comma: 188,
//         enter: 13
//     };
      
//     const delimiters = [KeyCodes.comma, KeyCodes.enter];

//     useEffect( ()=>{
//         if(editCourse){
//             setTags(course?.Tag)
//         }
//         register(name,{required:true ,validate: (value) => value.length > 0})
//     },[]);

//     useEffect( ()=>{
//         setValue(name, tags)
//     },[tags])

//     const handleDrag = (tag, currPos, newPos) => {
//         const newTags = tags.slice();
    
//         newTags.splice(currPos, 1);
//         newTags.splice(newPos, 0, tag);
    
//         setTags(newTags);
//     };
//     const handleTagClick = (index) => {
//         console.log('The tag at index ' + index + ' was clicked');
//     };

//   return (
//     <div>
//         <label htmlFor={name} className='text-sm text-richblack-5'>{label}<sup className='requiredValue'>*</sup></label>
//         <ReactTags name={name} 
//                 tags={tags}
//                 // suggestions={suggestions}
//                 delimiters={delimiters}
//                 handleDelete={deleteHandler}
//                 handleAddition={addHandler}
//                 handleDrag={handleDrag}
//                 handleTagClick={handleTagClick}
//                 inputFieldPosition="bottom"
//                 autocomplete
//         />

//         {
//             errors[name] && <span>provide course tags</span>
//         }
//     </div>
    
//   )
// }

// export default CourseTags