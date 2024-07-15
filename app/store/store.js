import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Catagory } from '@/app/constants/data'; // Assuming you have these constants


const useCartStore = create(
  persist(
    (set) => ({
      sessionEmail:'',
    
      menuitem: [], // Initialize with an empty array
      catagory: Catagory, // Using constants or fetching data from an API
    //  cart: [],

      // Action to update menu items
      setMenuItems: (newProducts) => set({ menuitem: newProducts }),
     // getCart: (newCart) => set({ cart: newCart }),
      getEmail: (newCart) => set({ sessionEmail: newCart }),

      // Action to add a product to the cart
      addToCart: (product) => {
        set((state) => {
          const existingProduct = state.cart.find((p) => p._id === product.id);
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

      // Action to remove a product from the cart
      removeFromCart: (product) => {
        set((state) => {
          // Reduce the quantity of the product
          const updatedCart = state.cart
            .map((p) =>
              p.id === product.id
                ? { ...p, quantity: Math.max(0, p.quantity - 1) }
                : p
            )
            .filter((p) => p.quantity > 0); // Filter out products with quantity 0
          return { cart: updatedCart };
        });
      },
    }),

    {
      name: 'cart-store', // Unique name for the persisted state
      storage: createJSONStorage(() => localStorage), // Use local storage for persistence
      // Other options as needed (e.g., blacklist certain properties)
      blacklist: ['sessionEmail',"cart"],
    }
  )
);

export default useCartStore;
