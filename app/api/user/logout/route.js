import { NextResponse } from "next/server";
export const GET=async (req,res)=>{
    const response =NextResponse.json({message:"user is logout"},{status:200})
        const token= response.cookies.set('token',"")
      
       
            return response;

}