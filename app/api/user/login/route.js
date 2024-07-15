import connectDb from "@/lib/db/db";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/helper/token";



export const POST = async (req, res) => {
  await connectDb();
  try {
    //get the data from the request
    const body = await req.json();
    const { email, password } = body;

    //check if the fields are empty
    if ( !email || !password) {
      return NextResponse.json(
        { message: "Please fill all fields" },
        { status: 400 }
      );
    }

    //check if the user already exists
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return NextResponse.json(
        { message: "user not found" },
        { status: 400 }
      );
    }

    if (!existUser.isVerified) {
      return NextResponse.json(
        { message: "Please verify your email" },
        { status: 400 }
      );
    }




    // campare the password
    const verifyPassword = await bcrypt.compare(password, existUser.password);
    if (!verifyPassword) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }
    const token = (await generateToken(existUser));

     

   

    const response = NextResponse.json(
        { token, success: true, message: "User login successfully" },
        { status: 200 }
      ); 
      response.cookies.set("token",token,{
        httpOnly:true,
        //cookie expires in 1 days
      //  expires:new Date(Date.now() + 48 * 60 * 60 * 1000),

      });
     
   

    return  response;
  } catch (error) {
    return NextResponse.json({ message: error.message ,customError:"something occur"}, { status: 500 });
  }
};


