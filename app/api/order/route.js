import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import User from "@/lib/models/user";
import Order from '@/lib/models/order';
import Product from "@/lib/models/product";
import connectDb from '@/lib/db/db';

// Initialize Stripe outside of the API handler
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



// API endpoint to create an order
export const POST = async (req, res) => {
     await connectDb();
  
  try {
    const { email, address, phone } = await req.json();
    const user = await User.findOne({email});

    // Validate user existence
    if (!user) {
      console.log("User not found");
      return NextResponse.json({ message: "User not found" });
    }

    // Validate cart contents
    if (user.cart.length === 0) {
      return NextResponse.json({ message: "Cart is empty" });
    }

    // // Initialize order details
    let totalAmount = 0;
    let orderItems = [];

    // Fetch price details and product names for each cart item
    for (const cartItem of user.cart) {
      console.log("looping through cart items");
      const product = await Product.findById(cartItem.product);
      // Check product existence
      if (!product) {
        return NextResponse.json({ message: `Product with ID ${cartItem.product} not found.` });
      }
      // Calculate item total
      const itemTotal = cartItem.quantity * product.price;
      totalAmount += itemTotal;
      orderItems.push({
        product: cartItem.product,
        name: product.name, // Include product name
        quantity: cartItem.quantity,
        price: product.price,
        total: itemTotal
      });
    }

    // Create order
    const order = new Order({
      user: user._id,
      items: orderItems,
      totalAmount,
      address,
      phone
    });

    // Save order
    await order.save();

    // Clear user's cart
    user.cart = [];
    await user.save();

    // Create a Stripe Checkout session
    const line_items = order.items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name, // Use the product name from the order item
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Shipping',
        },
        unit_amount: 200, // Assuming $2 for shipping
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: `${process.env.Domain}/orderVerify/${order._id}?success=true`, // Corrected URL
      cancel_url: `${process.env.Domain}/orderVerify/${order._id}?success=false`, // Corrected URL
    });

    // Return success response
    return NextResponse.json({ success: true, message: "Order created successfully", session_url: session.url }); // Use session.id
  } catch (error) {
    // Error handling
    console.error(error);
    return NextResponse.json({ success: false, message: "An error occurred while creating the order", error });
  }
};


export const GET = async (req, res) => {
  await connectDb();
  try {
    const orders=await Order.find();
    return NextResponse.json({orders});
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({error:"faile to fetch"},{status:404});
  }
}
