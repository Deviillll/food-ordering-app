import { create } from 'zustand';
import { MenuItems, Catagory } from '@/app/constants/data';

const useCartStore = create((set) => {
  return {
    menuitem: MenuItems, // Assuming you have defined MenuItems elsewhere
    catagory: Catagory, // Assuming you have defined Catagory elsewhere
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
        const updatedCart = state.cart.map((p) =>
          p.id === product.id
            ? { ...p, quantity: Math.max(0, p.quantity - 1) }
            : p
        );
        return { cart: updatedCart };
      });
    },


  };
});

export default useCartStore;
