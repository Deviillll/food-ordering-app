"use client";
import useCartStore from "../store/store";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import useCartArrayStore from "../store/cartStore";
import { useRouter } from "next/navigation";

import{ useEffect } from "react"

const CataProducts = ({ catagory }) => {
  const menuitem = useCartStore((state) => state.menuitem);
  const sessionEmail = useCartStore((state) => state.sessionEmail);
  const router = useRouter();
 
  const Cart = useCartArrayStore((state) => state.cart);
  const getCart = useCartArrayStore((state) => state.updateCart) ; 
  const setMenuItems = useCartStore((state) => state.setMenuItems);

  const fetchProducts = async () => {
    try {
    const response = await axios.get("api/products")
  
    setMenuItems(response.data)
    } catch (error) {
    console.error(error)
    }
}

useEffect(() => {
    fetchProducts()
}, [])





  async function fetchCart() {
    try {
        if(!sessionEmail){
            router.push("/sign-in")
        }
          const res = await axios.post("/api/cart", { email: sessionEmail });
           getCart(res.data.cart)
           console.log(res.data.cart)
        
     } catch (error) {
       console.log(error);         

     }
 }


  const add=async (email,productId)=>{
    const res=await axios.post("/api/cart/add",{email,productId})
    await fetchCart()
    

   }
   const sub=async (email,productId)=>{
    const res=await axios.post("/api/cart/subs",{email,productId})
     await fetchCart()
    

    }
 
  const isInCart = (productId) => {
    if (!Cart) {
      console.error("Cart is undefined");
      return false;
    }
    return Cart.some((product) => product.product === productId);
  };
  
  const addToCart = useCartArrayStore((state) => state.addToCart) ;   
  const removeFromCart = useCartArrayStore((state) => state.removeFromCart) ;   
  

  
  
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-2 px-4   md:px-8 mx-auto w-screen h-full">
      {menuitem.map((item, index) => {
        const productIsInCart = isInCart(item._id);
        return (
          <div
            key={index}
            className={`w-[40vw] hover:scale-105 h-64  sm:w-[200px] animate-wiggle sm:h-[270px] space-y-4 rounded-t-xl overflow-hidden md:w-[200px] md:h-64 
             bg-slate-50/70 mt-5 md:mt-8 shadow-md  ${
               catagory === item.category || catagory === "All" ? "block" : "hidden"
             }`}
          >
            <Image
            width={100}
            height={100}
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-40 object-cover  hover:scale-110 rounded-t-xl object-center"
            />
            <div className="p-2 flex items-center justify-between ">
              <div>
                <h1 className="text-md font-bold text-black ">
                  {item.name}
                </h1>
                <Image width={50} height={50} className="w-16" src="/rating_starts.png" alt="" />
                <p className="text-sm mt-1 text-zinc-800 font-bold">
                  ${item.price}
                </p>
              </div>
              <div>
               {/* { conditional rendering } */}
               
                {productIsInCart ? (
                  <div className="flex items-center justify-between space-x-3 md:space-x-4">
                    <Plus
                      className="cursor-pointer"
                      size={15}
                      onClick={()=>{add(sessionEmail,item._id);if(sessionEmail){ addToCart(item._id)}}}
                    />
                    <span className="text-orange-500 font-semibold text-md">
                      {Cart.find((product) => product.product === item._id)?.quantity || 0}
                    </span>
                    <Minus
                      className="cursor-pointer "
                      onClick={()=>{sub(sessionEmail,item._id); if(sessionEmail){ removeFromCart(item._id)}}}
                      size={15}
                    />
                  </div>
                ) : (
                  <Plus
                    className="cursor-pointer"
                    onClick={() => {add(sessionEmail,item._id);if(sessionEmail){ addToCart(item._id)}else{router.push("/sign-in")}}}
                    size={20}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CataProducts;
