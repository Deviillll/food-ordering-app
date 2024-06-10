import {create} from 'zustand';
import { MenuItems,Catagory } from '../constants/data';

// Define a store for managing the cart state
const useCartStore = create((set) => ({
  // Initialize the cart with an empty array
  menuitem: MenuItems,
  catagory:Catagory,
  cartItems: [],

  // Function to add an item to the cart
  addToCart: (product) => {
    console.log(product)
    // set((state) => {
    //   const existingItemIndex = state.cartItems.findIndex(
    //     (item) => item.id === product.id
    //   );

    //   if (existingItemIndex !== -1) {
    //     // If item already exists in cart, increment its quantity
    //     const updatedCartItems = [...state.cartItems];
    //     updatedCartItems[existingItemIndex].quantity += 1;
    //     return { cartItems: updatedCartItems };
    //   } else {
    //     // If item is not in cart, add it with quantity 1
    //     return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] };
    //   }
    // });
  },

  // Function to remove an item from the cart
  removeItem: (productId) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
      ),
    }));
  },
}));

export default useCartStore;
