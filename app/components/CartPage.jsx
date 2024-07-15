"use client";
import useCartArrayStore from "../store/cartStore";
import useCartStore from "../store/store";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const CartPage = ({ setCart }) => {
  const router = useRouter();

  const Cart = useCartArrayStore((state) => state.cart);
  const getCart = useCartArrayStore((state) => state.updateCart);
  const addToCart = useCartArrayStore((state) => state.addToCart);
  const removeFromCart = useCartArrayStore((state) => state.removeFromCart);

  const sessionEmail = useCartStore((state) => state.sessionEmail);
  const menuitem = useCartStore((state) => state.menuitem);

  const [cartProducts, setCartProducts] = useState([]);

  const add = async (email, productId) => {
    const res = await axios.post("/api/cart/add", { email, productId });
    fetchCart();
    router.refresh();
  };

  const sub = async (email, productId) => {
    const res = await axios.post("/api/cart/subs", { email, productId });
    fetchCart();
    router.refresh();
  };

  // Fetch the cart and merge with product data
  async function fetchCart() {
    try {
      const res = await axios.post("/api/cart", { email: sessionEmail });
      const cartData = res.data.cart;

      const mergedCart = cartData.map(cartItem => {
        const product = menuitem.find(item => item._id === cartItem.product);
        return {
          ...cartItem,
          name: product?.name,
          image: product?.imageUrl,
          price: product?.price,
        };
      });

      setCartProducts(mergedCart);
      getCart(cartData);
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="mt-28 md:w-[400px] w-[80vw] px-4 md:h-[89vh] h-screen overflow-y-scroll bg-slate-100 py-8 absolute  md:-top-[65px] -top-[73px] -right-5 md:-right-[3px]">
      <X
        className="cursor-pointer  absolute right-1 top-2 z-[100] mt-2"
        size={25}
        onClick={() => setCart(false)}
      />

      {cartProducts.length > 0 ? (
        <table className=" text-center w-full overflow-y-scroll mt-4  ">
          <thead>
            <tr className="uppercase text-xs md:text-md ">
              <th className="">Product</th>
              <th className="">Name</th>
              <th className="">Price</th>
              <th className="">Qty</th>
              <th className=""> </th>
              <th className="">Total</th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll">
            {cartProducts.map((item, index) => (
              <tr
                key={index}
                className="border border-orange-200 text-sm md:text-md "
              >
                <td>
                  <Image
                    width={50}
                    height={50}
                    src={item.image}
                    alt={item.name}
                    className="w-8 h-8 mt-1 md:w-12 md:h-12 object-cover rounded-full mx-auto "
                  />
                </td>
                <td className="mt-1 font-medium">{item.name}</td>
                <td className="mt-1 font-medium">${item.price}</td>
                <td className="mt-1 font-medium"> {item.quantity}</td>
                <div className="flex items-center h-16  mx-2 space-x-1 md:space-x-2 ">
                  <Plus
                    className="cursor-pointer bg-green-200 rounded-full  "
                    size={15}
                    onClick={() => {
                      add(sessionEmail, item.product);
                      addToCart(item.product);
                    }}
                  />
                  <span className="text-orange-500 font-semibold text-md">
                    {""}
                  </span>
                  <Minus
                    className="cursor-pointer  bg-red-400  rounded-full "
                    onClick={() => {
                      sub(sessionEmail, item.product);
                      removeFromCart(item.product);
                    }}
                    size={15}
                  />
                </div>
                <td className="mt-1 font-semibold">$ {Math.round(item.price * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Your cart is empty</p>
      )}
       <Link href="/checkout" className="block mt-8 ml-36">
        <button
          onClick={() => setCart(false)}
          className="md:px-6 px-3 py-2  ring-2 ring-orange-500  bg-orange-400 uppercase font-medium transition-colors ease-in-out hover:scale-105 hover:bg-white hover:text-black text-white rounded-xl"
        >
          checkout
        </button>
      </Link>
    </div>
  );
};

export default CartPage;
