"use client";
import useCartStore from "../store/store"; 
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
const CartPage = ({setCart}) => {
    const addToCart = useCartStore((state) => state.addToCart);
    const removePro = useCartStore((state) => state.removeFromCart);
    const Cart = useCartStore((state) => state.cart);
  return (
   <div className="mt-28 md:w-[400px] w-[80vw] px-4 md:h-[89vh] h-screen overflow-y-scroll bg-slate-100 py-8 absolute  md:-top-[65px] -top-[73px] -right-5 md:-right-[3px]">
    <X className="cursor-pointer  absolute right-1 top-2 z-[100] mt-2" size={25} onClick={()=>setCart(false)} />


    {Cart.length > 0 ? 
         <table className=" text-center w-full overflow-y-scroll mt-4  ">
         <thead >
             <tr className="uppercase text-xs md:text-md ">
                 <th className="">Product</th>
                 <th className="">Name</th>
                 <th className="">Price</th>
                 <th className="">Qty</th>
                 <th className="">{" "}</th>
                 <th className="">Total</th>
             </tr>
         </thead>
         <tbody className="overflow-y-scroll" >
             {Cart.map((item, index) => (
                 <tr key={index} className="border border-orange-200 text-sm md:text-md ">
                     <td>
                         <img src={item.image} alt={item.name} className="w-8 h-8 mt-1 md:w-12 md:h-12 object-cover rounded-full mx-auto " />
                     </td>
                     <td className="mt-1 font-medium">{item.name}</td>
                     <td className="mt-1 font-medium">${item.price}</td>
                     <td className="mt-1 font-medium">  {item.quantity}</td>
                     <div className="flex items-center h-16  mx-2 space-x-1 md:space-x-2 ">
                    <Plus
                      className="cursor-pointer bg-green-200 rounded-full  "
                      size={15}
                      onClick={() => addToCart(item)}
                    />
                    <span className="text-orange-500 font-semibold text-md">
                      {""}
                    </span>
                    <Minus
                      className="cursor-pointer  bg-red-400  rounded-full "
                      onClick={() => removePro(item)}
                      size={15}
                    />
                  </div>
                     <td className="mt-1 font-semibold">${item.price * item.quantity}</td>
                     
                 </tr>
             ))}
         </tbody>
 
     </table>:
        <p className="text-red-600 font-semibold  md:text-xl uppercase">please add some products</p>
     }

    <Link href="/checkout" className="block mt-8 ml-36">
        <button  className="md:px-6 px-3 py-2  ring-2 ring-orange-500  bg-orange-400 uppercase font-medium transition-colors ease-in-out hover:scale-105 hover:bg-white hover:text-black text-white rounded-xl">


            checkout
        </button>
        </Link>

   </div>
  )
}

export default CartPage;
