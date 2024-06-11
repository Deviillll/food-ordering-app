"use client"
import React,{useState} from 'react'
import { Minus, Plus } from 'lucide-react';
import useCartStore from '../store/store';

const CatagoryItems = () => {
    const [catagory, setcatagory] = useState("All")
  //  const [count, setcount] = useState(0)
    const menuitem = useCartStore((state) => state.menuitem)
    const Catagory = useCartStore((state) => state.catagory)
    const addToCart = useCartStore((state) => state.addToCart)
    const removePro = useCartStore((state) => state.removeFromCart)
    const Cart = useCartStore((state) => state.cart)
    console.log(Cart)
    
    
  return (
    <div className='w-screen'>

<div id='item' className='flex w-screen md:w-full px-2 items-center justify-center md:px-10 md:justify-around mt-10 py-5 text-center overflow-x-scroll md:overflow-hidden gap-4 '>       
        {Catagory.map((item, index) => {
            return (
                
                   <div  key={index} onClick={()=>setcatagory(item.name)}  className='cursor-pointer'>
                   <img src={item.image} alt={item.name} className={`w-10 h-10  md:w-20 hover:scale-105 md:h-20 object-cover object-center rounded-full ${catagory===item.name ? "border-[5px] animate-spin  border-orange-500 p-[2px]" :null}`}/>
                    <h1 className='text-xs md:text-md mt-3 font-normal text-orange-600 tracking-wide'>{item.name}</h1>
                   </div>
               
            )
        })}

         </div>

         <div className='mt-7 ml-10 text-3xl text-orange-400 underline font-semibold '><h1 className='tracking-wider'>{catagory}</h1></div>
      
       <div   className='mt-10 flex flex-wrap justify-center gap-x-10 gap-y-2 px-4  md:px-8 mx-auto w-screen h-full'>

        {menuitem.map((item, index) => {
            return (
                <div key={index} className={`w-[40vw] h-64 sm:w-[200px] sm:h-[270px] space-y-4 rounded-t-xl overflow-hidden md:w-[200px] md:h-64 
                 bg-slate-50/70 mt-5 md:mt-8 shadow-md  ${catagory===item.cata || catagory==="All" ? "block" : "hidden"}`}>
                    <img src={item.image} alt={item.name} className='w-full h-40 object-cover  hover:scale-110 rounded-t-xl object-center'/>
                    <div className='p-2 flex items-center justify-between'>
                        <div>
                        <h1 className='text-md font-medium text-orange-500'>{item.name}</h1>
                        <img className='w-20' src="/rating_starts.png" alt="" />
                        <p className='text-sm mt-1 text-zinc-800 font-medium'>${item.price}</p>
                        </div>
                        <div  >
                         
                            <Plus className='cursor-pointer' onClick={()=>addToCart(item)} size={20} />
                          {/* {!Cart ?  <Plus className='cursor-pointer' onClick={()=>addToCart(item)}
                                
                                size={20} /> : <div className='flex items-center justify-between space-x-2'> 
                                    <Plus className='cursor-pointer' size={15} onClick={()=>addToCart(item)}  />
                                <span className='text-orange-500 font-semibold text-md'>{""}</span>
                                <Minus className='cursor-pointer' onClick={()=>removePro(item)} size={15} />
                                </div>
                                } */}
                            
                       
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
