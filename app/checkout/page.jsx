"use client";
import useCartStore from "@/app/store/store"; 
import Link from "next/link";
import { Minus, Plus} from "lucide-react";
import Image from "next/image";
const CartPage = ({setCart}) => {
    const addToCart = useCartStore((state) => state.addToCart);
    const removePro = useCartStore((state) => state.removeFromCart);
    const Cart = useCartStore((state) => state.cart);
  return (
   <div className="mt-20 w-full px-4  h-full  bg-stone-100 py-8 ">
    


    {Cart.length > 0 ? 
    <div>
         <table className=" text-center w-full  mt-4  ">
         <thead >
             <tr className="uppercase text-sm md:text-md ">
                 <th className="">Product</th>
                 <th className="">Name</th>
                 <th className="">Price</th>
                 <th className="">Qty</th>
                 <th className="">{"    "}</th>
                 <th className="">Total</th>
             </tr>
         </thead>
         <tbody className="overflow-y-scroll" >
             {Cart.map((item, index) => (
                 <tr key={index} className="border border-orange-200 text-sm md:text-md ">
                     <td>
                         <Image width={50} height={50} src={item.image} alt={item.name} className="w-8 h-8 mt-1 md:w-12 md:h-12 object-cover rounded-full mx-auto " />
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
                     <td className="mt-1 font-semibold">$ {Math.round(item.price * item.quantity)}</td>
                     
                 </tr>
             ))}
         </tbody>
 
     </table>
      <div>
      <div className="uppercase md:mt-10 mt-5 space-y-8 md font-medium  md:flex justify-around text-center">
   
   <div  className="space-y-5 flex-1 px-8">
         <h1>enter delivery address</h1>
         <textarea className="w-full" name="" id="" rows={4}></textarea>
          <p className="text-orange-500">  <span className="text-slate-500 text-sm">Note :   </span> Delivery charges is 2$</p>
       </div>
   
       <div className="space-y-5 flex-1">
         <h1>enter payment method</h1>
         <select name="payment method" id="payment method">
           <option value="paypal">paypal</option>
           <option value="card">card</option>
           <option value="jazzCash">jazzCash</option>
         </select>
         <input className="mx-4 px-3 rounded-lg text-sm py-1 " type="text "  placeholder="enter your details"/>
       </div>
       <div className="space-y-5 px-5 ">
         <h1>Total Amount </h1>
         
         <div>
        
         <p className="font-bold">{Math.round(Cart.reduce((acc, item) => acc + item.price * item.quantity, 0)+(Cart.length>0 ? 2:0) )} $</p>
         </div>
       </div>
   </div>
   
   <div className="mt-10  space-x-7 flex justify-center">
     <button className="bg-orange-400 px-4 py-2 text-sm rounded-lg font-semibold uppercase">Pay Now</button>
   
   <Link href={"/#item"} className="bg-orange-400 px-4 py-2 text-sm rounded-lg font-semibold uppercase">add more products</Link>
   </div>
      </div>
      </div>
     :
     <Link href={"/#item"} className="bg-orange-400 px-4 py-2 text-sm rounded-lg font-semibold uppercase">add more products</Link>
     }
    


   </div>
  )
}

export default CartPage;
