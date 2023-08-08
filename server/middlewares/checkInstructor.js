
const checkInstructor= (req,res,next)=>{
    try{

        if(req.user.AccountType!=="Instructor"){
            return res.status(401).json({
                success:false,
                message:"for instructors only"
            })
        }

        next();

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"instructor verification incomplete"
        })
    }
}
module.exports=checkInstructor;