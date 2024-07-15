import connectDb from "@/lib/db/db";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  await connectDb();
  const { id } = params;

  try {

    const user = await User.findById(id);
   

   
    
     if (!user){
       return NextResponse.json({ message: "user not found", id });
     }
     
     if (user.isVerified) {
       return NextResponse.json({ message: "already verified"});
     }
     
     const verifiedUser = await User.findByIdAndUpdate(id, {
       $set: { isVerified: true }
     });


     


    const savedUser = await verifiedUser.save();

    return NextResponse.json({ message: "thanks to verify"  });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};
