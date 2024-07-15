"use client"
import { logout } from "@/action"
export default function SignOut() {
 

  return (
    <form action={logout}>
      <button className=" bg-black rounded-md text-white px-3 mr-2 py-1 "  type="submit" >Sign Out</button>
    </form>
  )
}