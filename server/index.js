const express=require("express");
const app=express();
require("dotenv").config();
const userRoutes=require("./routes/user");
const paymentRoutes=require("./routes/payments");
const profileRoutes=require("./routes/profile");
const courseRoutes=require("./routes/course");
const contactRoutes=require("./routes/contact")

const cookieParser=require("cookie-parser");
const dbConnection =require("./config/dbConnection");
const cloudinaryConnect=require("./config/cloudinaryConnect");
const cors=require("cors");
const fileUpload=require("express-fileupload");

const port =process.env.BACKEND_PORT || 3003;

//middlewares
app.use(cookieParser());
app.use(express.json());

// we have to entertain the request coming from front end
app.use(cors({
    origin:"*",     
    credentials:true, 
}))

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


dbConnection();
console.log("connecting cloudinary")
cloudinaryConnect();

//mounting routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/reach",contactRoutes)


//default route
app.get("/" ,(req,res)=>{
    return res.json({
        success:true,
        message:"server actication successful"
    })
})

app.listen(port, () =>{
    console.log("server started successfully on port ", port);
})
