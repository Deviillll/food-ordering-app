import connectDb from "@/lib/db/db";
import Product from "@/lib/models/product";
import { NextResponse } from "next/server";
export const POST = async (req ,res) => {
    const {name,price,imageUrl,category} = await req.json();
    console.log(name,price,imageUrl,category, "name,price,imageUrl,category")
    if(!name || !price || !imageUrl || !category){
        return NextResponse.badRequest({message: "All fields are required"});
    }
    await connectDb();
    try {
        
        const newProduct = await Product.create({
            name,
            price,
            imageUrl,
            category,
        });
       const savedProduct= await newProduct.save();
        return NextResponse.json({message: "Product added successfully"});
        
    } catch (error) {
        console.log(error, "error")
        return NextResponse.error({message: "error agya hai bhai"});
    }
}


export const GET = async (req, res) => {
    await connectDb();
    try {
        const products = await Product.find();
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.error({message: "error agya hai bhai"});
    }
}