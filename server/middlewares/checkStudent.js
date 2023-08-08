
const checkStudent= (req,res,next)=>{
    try{

        if(req.user.AccountType!=="Student"){
            return res.status(401).json({
                success:false,
                message:"for students only"
            })
        }

        next();

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"student verification incomplete"
        })
    }
}
module.exports=checkStudent;