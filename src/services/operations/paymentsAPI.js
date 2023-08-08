import { apiConnector } from "../apiConnector";
import { studentEndpoints } from "../apis";
import  logo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../redux/slices/courseSlice";
import { resetCart } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

const { COURSE_PAYMENT_API, COURSE_VERIFY_API ,SEND_PAYMENT_SUCCESS_EMAIL_API } =studentEndpoints;

const sendPaymentSuccessMail=async(res,amount,token)=>{
    console.log("calling payment success mail sender controller")
    const toastId = toast.loading("Loading...");

    try{
        await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderID:res.razorpay_order_id,
            paymentID:res.razorpay_payment_id,
            amount:amount
        },{
            Authorization: `Bearer ${token}`
        })
        toast.success("payment success email sent successfully")
        console.log("payment success email sent successfully")
    } catch(error){
        console.error(error);
        toast.error("error in sending payment success mail")
        console.log("error in sending payment success mail")
    }
    toast.dismiss(toastId)
}

const verifyPayment=async(body, token , navigate, dispatch)=>{
    const toastId = toast.loading("Loading...");

    dispatch(setPaymentLoading(true));
    try{
        const response=await apiConnector("POST",COURSE_VERIFY_API,body,{
            Authorization:`Bearer ${token}`
        })

        if(!response.data.success){
            console.log("error in payment verification")
        }
        toast.success("payment verification success")
        console.log("payment verification success");
        navigate("/dashboard/enrolledCourses");
        dispatch(resetCart());



    } catch(error){
        toast.error("error in payment verification")
        console.error(error);
        console.log("error in payment verification")
    }
    dispatch(setPaymentLoading(false))
    toast.dismiss(toastId)
}

const loadScript=(src)=>{
    return new Promise((resolve)=>{
        const script=document.createElement("script");
        script.src=src;
        script.onload=()=>{
            resolve(true);
        }
        script.onerror=()=>{
            resolve(false);
        }

        document.body.appendChild(script);
    })
}
export async function buyCourse(token, courses ,user, navigate, dispatch){
    const toastId = toast.loading("Loading...");

    try{
        //load script
        const res=await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!res){
            console.log("razorpay sdk failed to load");
            return;
        }

        //initiate the payment by creating order
        const response =await apiConnector("POST",COURSE_PAYMENT_API,{courses},
        {
            Authorization:`Bearer ${token}`
        });

        if(!response.data.success){
            toast.warn("error in payment initiation")
            console.log("error in payment initiation")
        }

        console.log(response)
        const options={
            key:process.env.RAZORPAY_KEY,
            currency:response.data.message.currency,
            amount:`${response.data.message.amount}`,
            order_id:response.data.message.id,
            name:"Studynotion",
            description:"Thank you for purchasing the course",
            image:logo,
            prefill:{
                name:`${user.FirstName}`,
                email:`${user.Email}`
            },
            handler:function(res){
                sendPaymentSuccessMail(res,response.data.message.amount,token)
                verifyPayment({...res,courses},token , navigate,dispatch)
            }
        }

        var paymentWindow = new window.Razorpay(options);
        paymentWindow.open();
        paymentWindow.on('payment.failed', function (response){
            console.log("payment failed!!!");
            toast.error("payment failed")
            console.log(response.error.description)
        });
        
    } catch(error){
        console.error(error);
        toast.error("payment initiation api error")
        console.log("payment initiation api error")
    }
    toast.dismiss(toastId)
}