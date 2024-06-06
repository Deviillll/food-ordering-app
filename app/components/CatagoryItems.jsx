"use client"
import React,{useState} from 'react'
import { Catagory,MenuItems } from "../constants/data";
const CatagoryItems = () => {
    const [catagory, setcatagory] = useState("All")
  return (
    <div className='px-5    '>

<div className='flex  items-center justify-center md:justify-around mt-10 text-center overflow-x-auto gap-4 '>       
        {Catagory.map((item, index) => {
            return (
                
                   <div  key={index} onClick={()=>setcatagory(item.name)}  className='cursor-pointer'>
                   <img src={item.image} alt={item.name} className={`w-12 h-12  md:w-20 md:h-20 object-cover object-center rounded-full ${catagory===item.name ? "border-[5px] border-orange-500 p-[2px]" :null}`}/>
                    <h1 className='text-sm md:text-md mt-3 font-normal text-orange-600 tracking-wide'>{item.name}</h1>
                   </div>
               
            )
        })}

         </div>
      
       <div className='mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-evenly mx-auto  items-center  w-screen px-5'>

        {MenuItems.map((item, index) => {
            return (
                <div key={index} className={`w-52 h-52  md:w-44 md:h-52  bg-white mt-5 md:mt-8 shadow-md  ${catagory===item.cata || catagory==="All" ? "block" : "hidden"}`}>
                    <img src={item.image} alt={item.name} className='w-full h-32 object-cover rounded-xl object-center'/>
                    <div className='p-4'>
                        <h1 className='text-md font-medium text-orange-500'>{item.name}</h1>
                        <p className='text-sm mt-2 text-zinc-800 font-medium'>${item.price}</p>
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
