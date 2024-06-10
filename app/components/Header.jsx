import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div
      className="flex flex-col uppercase relative z-[1]  bg-center bg-cover px-10 justify-center items-center text-center h-[70vh] md:h-[91vh]  w-screen"
      style={{
        backgroundImage: `url('/bg-3.jpg')`,
      }}
    >
      <div className="absolute  h-[70vh]  md:h-[91vh] w-screen bg-black/90 z-[2] ">

      </div>
      <div className="relative z-10 space-y-9">
      <h1 className=" text-slate-100   text-[5.5vw]  md:text-[4vw] font-semibold leading-normal ">
          
      Delicias  Sabores Tradicionales <br /><span className="text-orange-400 animate-pulse hover:animate-none ">    que Te Transportan</span>
        </h1>

        <p className="text-sm md:text-lg tracking-wide font-medium text-zinc-300 line-clamp-2 md:line-clamp-none leading-6 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
          fugiat officiis. Illum numquam sit amet consectetur adipisicing elit. Eveniet,
          fugiat officiis. Illum numquam !
        </p>
        <Link href="#item" className="block">
        <button  className="md:px-6 px-3 py-2 animate-bounce hover:animate-none ring-2 ring-orange-500  bg-orange-400 uppercase font-medium transition-colors ease-in-out hover:scale-105 hover:bg-white hover:text-black text-white rounded-xl">


          shop now
        </button>
        </Link>
        
      </div>
    </div>
  );
};

export default Header;
