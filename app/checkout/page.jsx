"use client";
import useCartStore from "@/app/store/store";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import useCartArrayStore from "../store/cartStore";
import { useEffect, useState } from "react";
import axios from "axios";

const CheckoutPage = ({}) => {
  const addToCart = useCartArrayStore((state) => state.addToCart);
  const removePro = useCartArrayStore((state) => state.removeFromCart);
  const sessionEmail = useCartStore((state) => state.sessionEmail);
  const menuitem = useCartStore((state) => state.menuitem);
  const [cartProducts, setCartProducts] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  

  const handleOrder = async () => {
    setLoading(true);
    try {
     if (!data.address || !data.phone) {
        return alert("Please fill all fields");
      }
      const res = await axios.post("/api/order", {
        email: sessionEmail,
        address: data.address,
        phone: data.phone,
      });
      if (res.data.success) {
        const data = res.data;
        console.log(data);
        const { session_url } = data;
        window.location.replace(session_url);
      }
      setData({});
   
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const add = async (email, productId) => {
    const res = await axios.post("/api/cart/add", { email, productId });
    fetchCart();
  };

  const sub = async (email, productId) => {
    const res = await axios.post("/api/cart/subs", { email, productId });
    fetchCart();
  };

  // Fetch the cart and merge with product data
  async function fetchCart() {
    try {
      const res = await axios.post("/api/cart", { email: sessionEmail });
      const cartData = res.data.cart;

      const mergedCart = cartData.map((cartItem) => {
        const product = menuitem.find((item) => item._id === cartItem.product);
        return {
          ...cartItem,
          name: product?.name,
          image: product?.imageUrl,
          price: product?.price,
        };
      });

      setCartProducts(mergedCart);
     
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="mt-20 w-full px-4 h-full bg-stone-100 py-8">
      {cartProducts.length > 0 ? (
        <div>
          <table className="text-center w-full mt-4">
            <thead>
              <tr className="uppercase text-sm md:text-md">
                <th className="">Product</th>
                <th className="">Name</th>
                <th className="">Price</th>
                <th className="">Qty</th>
                <th className="">{"    "}</th>
                <th className="">Total</th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll">
              {cartProducts.map((item, index) => (
                <tr
                  key={index}
                  className="border border-orange-200 text-sm md:text-md"
                >
                  <td>
                    <Image
                      width={50}
                      height={50}
                      src={item.image}
                      alt={item.name}
                      className="w-8 h-8 mt-1 md:w-12 md:h-12 object-cover rounded-full mx-auto"
                    />
                  </td>
                  <td className="mt-1 font-medium">{item.name}</td>
                  <td className="mt-1 font-medium">${item.price}</td>
                  <td className="mt-1 font-medium">{item.quantity}</td>
                  <div className="flex items-center h-16 mx-2 space-x-1 md:space-x-2">
                    <Plus
                      className="cursor-pointer bg-green-200 rounded-full"
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
                      className="cursor-pointer bg-red-400 rounded-full"
                      onClick={() => {
                        sub(sessionEmail, item.product);
                        removePro(item.product);
                      }}
                      size={15}
                    />
                  </div>
                  <td className="mt-1 font-semibold">
                    ${Math.round(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <div className="uppercase md:mt-10 mt-5 space-y-8 md font-medium md:flex justify-around text-center">
              <div className="space-y-2  flex-1 px-8">
                <h1>Enter Delivery Address</h1>
                <textarea
                  value={data.address}
                  onChange={(e) =>
                    setData({ ...data, address: e.target.value })
                  }
                  className="w-1/2"
                  name=""
                  id=""
                  rows={3}
                ></textarea>
                <h1>Phone</h1>
                <input
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  className=""
                  type="text"
                />
                <p className="text-orange-500">
                  <span className="text-slate-500 text-sm">Note: </span>{" "}
                  Delivery charges is $2
                </p>
              </div>
              <div className="space-y-5 flex-1">
                <h1>Payment Method</h1>
                <p className="text-orange-500">
                  <span className="text-slate-500 text-sm">Note: </span> Only
                  Card Payment is accepted
                </p>
                <button
                  onClick={handleOrder}
                  className="bg-orange-400 px-4 py-2 text-sm rounded-lg font-semibold uppercase"
                >
                  {loading ? "Processing..." : "Place Order"}
                </button>
              </div>
              <div className="space-y-5 px-5">
                <h1>Total Amount</h1>
                <div>
                  <p className="font-bold">
                    {Math.round(
                      cartProducts.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      ) + (cartProducts.length > 0 ? 2 : 0)
                    )}{" "}
                    $
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 space-x-7 flex justify-center">
              <Link
                href={"/#item"}
                className="bg-orange-400 px-4 py-2 text-sm rounded-lg font-semibold uppercase"
              >
                Add More Products
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default CheckoutPage;
