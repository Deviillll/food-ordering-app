import { NextResponse } from "next/server";
import User from "@/lib/models/user";
import connectDb from "@/lib/db/db";

export const POST = async (req, res) => {
  await connectDb();
  try {
    const { email, productId } = await req.json();
    const user = await User.findOne({email});
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" });
    }
    const cart = user.cart; // Assuming cart is a synchronous property
    // Check if the product is already in the cart
    const index = cart.findIndex(
      (item) => item.product.toString() === productId
    );
    if (index >= 0) {
      // Product exists, increment quantity
      cart[index].quantity += 1;
    } else {
      // Product does not exist, add new item
      cart.push({ product: productId, quantity: 1 });
    }
    await user.save(); // Save the updated user document
    return NextResponse.json({ cart });
  } catch (error) {
    console.error(error); // Use console.error to log errors
    return NextResponse.json({ message: "Error", error });
  }
};
