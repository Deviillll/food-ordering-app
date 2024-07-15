import connectDb from "@/lib/db/db";
import Order from "@/lib/models/order";
import { NextRequest, NextResponse } from "next/server";

export const POST=async (request,{params})=>{
    await connectDb();
    const {success} = await request.json();
    const {orderId} = await params;
    if (success) {
        
        const order =await  Order.findById(orderId);
    if(!order){
        return NextResponse.json({error:"Order not found"},{status:404});
    }
    const updatedOrder = await Order.findByIdAndUpdate(orderId,{paymentStatus:"paid"});
    updatedOrder.paymentStatus = "paid";
   await updatedOrder.save();
   return NextResponse.json({status:"Payment successful"});

  }else{

    const order =await  Order.findById(orderId);

    if(!order){
        return NextResponse.json({error:"Order not found"},{status:404});
    }
    const updatedOrder = await Order.findByIdAndDelete(orderId);

      return NextResponse.json({status:"Payment failed"},{status:400});
  }

   


}