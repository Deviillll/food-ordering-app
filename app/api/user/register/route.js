import connectDb from "@/lib/db/db";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import sendEmail from "@/helper/email";

export const POST = async (req, res) => {
  await connectDb();
  try {
    //get the data from the request
    const body = await req.json();
    const { name, email, password } = body;

    //check if the fields are empty
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Please fill all fields" },
        { status: 400 }
      );
    }

    //check if the user already exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    // hash the password
    const hashPassword = await bcrypt.hash(password, 8);
    //create the user
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    const mail = await sendEmail(user.email,user._id);
    if (mail) {
      console.log("email sent",email);
      const savedUser = await user.save();
    }else{
      console.log("email not sent",email);
      return NextResponse.json(
        { message: "Email not sent" ,user:"user is not save in db"},
        { status: 400 })
    }
   // const token = await generateToken(savedUser);
    const response = NextResponse.json(
      { success: true, message: "User created successfully" },
      { status: 200 }
    );
    // response.cookies.set("token", token, {
    //   httpOnly: true,
    // });

    //send email to the user

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: error.message, customError: "something occur" },
      { status: 500 }
    );
  }
};
