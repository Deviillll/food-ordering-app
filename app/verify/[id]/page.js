"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = ({ params }) => {
  const [message, setmessage] = useState("");

  const router = useRouter();
  const { id } = params;
  const handleVerify = async () => {
    try {
      const res = await fetch(`/api/user/verify/${id}`);
      
      const data = await res.json();
     
      setmessage(data.message);
      if (message == "thanks to verify" || message == "verified") {
     
        if (data.message === "thanks to verify") {
          setTimeout(() => {
            router.push("/sign-in");
          }, 1000);
        }
      }
     else{
      setmessage("thanks to verify")
     }
      
    } catch (error) {
      console.log(error);
      
    }
  };
  useEffect(() => {
    
      setmessage(" ");
     handleVerify();
         
  }, []);

  return (
    <div className="mt-16">
      <h1> {message&& message} </h1>
    </div>
  );
};

export default page;
