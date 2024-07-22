"use client";
import { getsession } from '@/action'
import ImageUpload from '../components/ImageUpload'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const page = async() => {
  const router = useRouter();

  // const session = await getsession()
  // if (!session || !session.user) {
  //   console.error("Session or user is null");
  //   return redirect("/");
             
  // }

  // const role = session.user.role;

  // if (role !== "admin") {
  //   redirect("/");
  // }
  const checkSession = async () => {
    const session = await getsession();
    if (!session) {
      router.push("/");
    }
    const role = session.user.role;
    if (role !=="admin") {
         router.push("/");
       }
  };

  useEffect(() => {
    checkSession();
  }, []);


  



  return (
    <div>
        <ImageUpload />
      
    </div>
  )
}

export default page
