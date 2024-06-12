import { create } from 'zustand';
import { MenuItems, Catagory } from '@/app/constants/data';

const useCartStore = create((set) => {
  return {
    menuitem: MenuItems, // using constants / fetch data from api
    catagory: Catagory, // using constants / fetch data from api
    cart: [],

    addToCart: (product) => {
      set((state) => {
        const existingProduct = state.cart.find((p) => p.id === product.id);
        if (existingProduct) {
          // Product already exists in the cart, increase quantity
          const updatedCart = state.cart.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          );
          return { cart: updatedCart };
        } else {
          // Product not in cart, add it with quantity 1
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }
      });
    },
    

    removeFromCart: (product) => {
      
      set((state) => {
        // Reduce the quantity of the product
        const updatedCart = state.cart.map((p) =>
          p.id === product.id
            ? { ...p, quantity: Math.max(0, p.quantity - 1) }
            : p
          
        ).filter((p) => p.quantity > 0);      // Filter out the products with quantity 0
      
        return { cart: updatedCart };
      });
    },
    


  };
});

export default useCartStore;
