"use client";
import React, { useState } from "react";
import { pages } from "../constants/data";
import Link from "next/link";
import { Search } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import { User } from "lucide-react";
import { AlignJustify } from "lucide-react";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  

  return (
    <nav>
    <div className="flex justify-between px-5 py-2 uppercase items-center  bg-orange-400 shadow-md">
      <div className="">
        <h1 className="font-semibold text-xl md:text-2xl tracking-tight">Food bay</h1>
      </div>


      <div className="space-x-7 hidden md:flex  font-medium ">
        {pages.map((page) => (
          <Link href={page.path} key={page.name} className={`hover:scale-110 transition-transform ease-in-out  ${path===page.path ? "border-b-2" : ""}`}>
            {page.name}
          </Link>
        ))}
      </div>
      <div className="flex justify-between gap-4 md:gap-6 relative ">
       
       
        <ShoppingBag  />
        <User className="hidden md:block" />
        <span className="absolute w-4 h-4 -top-1 text-center flex justify-center items-center text-xs md:text-sm  md:left-[16px] left-4 rounded-full bg-slate-100">0</span>

        {/* mobile menu */}

        <div className="md:hidden">
          {!open ?  <AlignJustify onClick={() => setOpen((prev) => !prev)} className="transition-all ease-in" size={30}/>
          :
          <X onClick={() => setOpen((prev) => !prev)} size={30} /> }
        </div>
      </div>
    </div>
     {open && 
      <div className=" flex flex-col w-[60vw] mt-1 text-center font-semibold text-2xl uppercase transition-all ease-linear delay-150  justify-center items-center space-y-6 bg-orange-400 h-[98vh]">
       { pages.map((page)=>(
        <Link className="inline-block " href={page.path} key={page.name}>
          {page.name}
        </Link>
        ))}
        <User size={35} fill="black" />
        
      </div>
    }
    </nav>
  );
};

export default Navbar;
