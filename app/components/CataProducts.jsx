import useCartStore from "../store/store";
import { Minus, Plus } from "lucide-react";

const CataProducts = ({ catagory }) => {
  const menuitem = useCartStore((state) => state.menuitem);
  const addToCart = useCartStore((state) => state.addToCart);
  const removePro = useCartStore((state) => state.removeFromCart);
  const Cart = useCartStore((state) => state.cart);
 
  const isInCart = (productId) => {
    return Cart.some((product) => product.id === productId);
  };
  

  
  
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-2 px-4   md:px-8 mx-auto w-screen h-full">
      {menuitem.map((item, index) => {
        const productIsInCart = isInCart(item.id);
        return (
          <div
            key={index}
            className={`w-[40vw] hover:scale-105 h-64 sm:w-[200px] animate-wiggle sm:h-[270px] space-y-4 rounded-t-xl overflow-hidden md:w-[200px] md:h-64 
             bg-slate-50/70 mt-5 md:mt-8 shadow-md  ${
               catagory === item.cata || catagory === "All" ? "block" : "hidden"
             }`}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover  hover:scale-110 rounded-t-xl object-center"
            />
            <div className="p-2 flex items-center justify-between">
              <div>
                <h1 className="text-md font-medium text-orange-500">
                  {item.name}
                </h1>
                <img className="w-16" src="/rating_starts.png" alt="" />
                <p className="text-sm mt-1 text-zinc-800 font-medium">
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
                      onClick={() => addToCart(item)}
                    />
                    <span className="text-orange-500 font-semibold text-md">
                      {Cart.find((product) => product.id === item.id)?.quantity || 0}
                    </span>
                    <Minus
                      className="cursor-pointer "
                      onClick={() => removePro(item)}
                      size={15}
                    />
                  </div>
                ) : (
                  <Plus
                    className="cursor-pointer"
                    onClick={() => addToCart(item)}
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
