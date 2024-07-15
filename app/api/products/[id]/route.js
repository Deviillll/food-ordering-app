import connectDb from "@/lib/db/db";
import Product from "@/lib/models/product";
import { NextResponse } from "next/server";

export const PUT = async (req ,{params}) => {
    const {id}= params;
    console.log(id, "id")
    const {name,price,imageUrl,category} = await req.json();
    await connectDb();
    try {
        const product = await Product.findById(id);
        if(!product){
            return NextResponse.badRequest({message: "Product not found"});
        }
        console.log(name,price,imageUrl,category, "name,price,imageUrl,category")
       if(name){
           product.name = name;
         }
            if(price){
            product.price = price;
            }
            if(imageUrl){
            product.imageUrl = imageUrl;
            }
            if(category){
            product.category = category;
            }
       
        const updatedProduct = await product.save();
        return NextResponse.json({message: "Product updated successfully", updatedProduct});
    }
    catch (error) {
        return NextResponse.error({message: "error agya hai bhai"});
    }
}

export const DELETE = async (req ,{params}) => {
    const {id}= params;
    await connectDb();
    try {
      const deletedUser=await Product.findByIdAndDelete(id);
        if(!deletedUser){
            return NextResponse.json({message: "Product not found"});
        }
        return NextResponse.json({message: "Product deleted successfully"});
    }
    catch (error) {
        return NextResponse.json({message: "error agya hai bhai"});
    }
}


export const GET = async (req ,{params}) => {
    const {id}= params;
    await connectDb();
    try {
    
     const singleproduct = await Product.findById(id);
      
        if(!singleproduct){
            return NextResponse.json({message: "Product not found"});
        }
  

        return NextResponse.json({message: "Product get successfully", singleproduct});
      
    }
    catch (error) {
        console.log(error, "error")
        return NextResponse.json({message: "error agya hai bhai",error});
    }
}