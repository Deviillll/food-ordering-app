"use client"
import React,{useState} from 'react'
import { Catagory,MenuItems } from "../constants/data";
import { Plus } from 'lucide-react';
const CatagoryItems = () => {
    const [catagory, setcatagory] = useState("All")
  return (
    <div className=''>

<div className='flex  items-center justify-center md:px-10 md:justify-around mt-10 text-center overflow-x-auto gap-4 '>       
        {Catagory.map((item, index) => {
            return (
                
                   <div  key={index} onClick={()=>setcatagory(item.name)}  className='cursor-pointer'>
                   <img src={item.image} alt={item.name} className={`w-12 h-12  md:w-20 md:h-20 object-cover object-center rounded-full ${catagory===item.name ? "border-[5px] border-orange-500 p-[2px]" :null}`}/>
                    <h1 className='text-sm md:text-md mt-3 font-normal text-orange-600 tracking-wide'>{item.name}</h1>
                   </div>
               
            )
        })}

         </div>

         <div className='mt-7 ml-10 text-3xl text-orange-400 underline font-semibold '><h1 className='tracking-wider'>{catagory}</h1></div>
      
       <div className='mt-10 flex flex-wrap justify-center gap-x-10 gap-y-2 px-4  md:px-8 mx-auto w-screen h-full'>

        {MenuItems.map((item, index) => {
            return (
                <div key={index} className={`w-[40vw] h-60 sm:w-[200px] sm:h-[240px] rounded-t-xl  md:w-[200px] md:h-60 
                 bg-white mt-5 md:mt-8 shadow-md  ${catagory===item.cata || catagory==="All" ? "block" : "hidden"}`}>
                    <img src={item.image} alt={item.name} className='w-full h-40 object-cover rounded-t-xl object-center'/>
                    <div className='p-2 flex items-center justify-between'>
                        <div>
                        <h1 className='text-md font-medium text-orange-500'>{item.name}</h1>
                        <img className='w-20' src="/rating_starts.png" alt="" />
                        <p className='text-sm mt-1 text-zinc-800 font-medium'>${item.price}</p>
                        </div>
                        <div className='cursor-pointer' >
                            <Plus className='' />
                       
                        </div>
                    </div>
                </div>
            )
        }
        )}

        
       

       </div>

    </div>
  )
}

export default CatagoryItems
