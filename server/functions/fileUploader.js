const cloudinary =require("cloudinary");

const fileUploader= async(file ,folder, height ,quality) =>{
    console.log(file)
    const options ={
        folder,
        resource_type:"auto"
    };
    if(height){
        options.height=height;
    }
    if(quality){
        options.quality=quality;
    }

    console.log("uploading to cloudinary")
    
    // await cloudinary.v2.uploader.upload(file.tempFilePath,{timeout:120000}).then(result=>console.log(result));
    return await cloudinary.v2.uploader.upload(file.tempFilePath, {timeout:120000});


    // return await cloudinary.uploader.upload(file.tempFilePath,options);  
    
    
}
module.exports=fileUploader;