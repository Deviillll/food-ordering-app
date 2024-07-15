import { NextResponse } from "next/server";

import User from "@/lib/models/user";
import connectDb from "@/lib/db/db";

export const POST = async (req, res) => {
  await connectDb();
  const { email } = await req.json();
  try {
    const user = await User.findOne({email});
    if (!user) {
      return NextResponse.json({ message: "invalid credentials" });
    }
    const cart = await user.cart;
    return NextResponse.json({ cart });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error", error });
  }
};
