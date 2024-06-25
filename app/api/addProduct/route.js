import { NextResponse } from "next/server";
import connectDb from "../../_dbConnection/db";
export async function GET (){
  await connectDb();
 return NextResponse.json({message: "Hello World"},{status:200});
}