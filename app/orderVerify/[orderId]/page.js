"use client";
import { useSearchParams} from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import useCartArrayStore from "@/app/store/cartStore";

const page =  ({params}) => {
  const cart = useCartArrayStore((state) => state.cart);
  const updateCart = useCartArrayStore((state) => state.updateCart);
    const {orderId} =  params;
    const searchParams = useSearchParams();
  const success =searchParams.get('success')
  const [orderStatus, setOrderStatus] = useState(null);
  const router=useRouter();

  const orderVerify = async (orderId,success) => {
    setOrderStatus("");
   try {
     const res = await axios.post(`/api/order/${orderId}`, {success});
     const data = await res.data;
     console.log(data);
     setOrderStatus(data.status);
      if(data.status==="Order verified"){
        updateCart([]);
      }

     setTimeout(() => {
       router.push("/");
      }, 2000);



   } catch (error) {
     console.log(error);
    
   }

  }
  

  return (
    <div className="flex flex-cols text-center justify-center items-center h-screen w-screen">
     <div className="w-1/3">
     <h1 className="text-xl mb-6">Order Verification</h1>
       <div>
       <button className="bg-blue-500 text-white p-2 rounded-md mt-2 w-full" onClick={()=>orderVerify(orderId,success)}>check order status</button>
       </div>
        {orderStatus && <div>{orderStatus}</div>}

     </div>
      
    </div>
  )
}

export default page
