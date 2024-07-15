import {create} from 'zustand';

const useCartArrayStore = create((set) => ({
  cart: [],
  cartProducts: [],
  // Action to update the cart
  updateCart: (newCart) => set({ cart: newCart }),

  updateCartProducts: (cartProducts) => set({ cartProducts }),
  // Action to add a product to the cart
  addToCart: (productId) => {
    set((state) => {
      const existingProduct = state.cart.find((p) => p.product === productId);
      if (existingProduct) {
        // Product already exists in the cart, increase quantity
        const updatedCart = state.cart.map((p) =>
          p.product === productId ? { ...p, quantity: p.quantity + 1 } : p
        );
        return { cart: updatedCart };
      } else {
        // Product not in cart, add it with quantity 1
        return { cart: [...state.cart, { ...productId, quantity: 1 }] };
      }
    });
  },

  // Action to remove a product from the cart
  removeFromCart: (productId) => {
    set((state) => {
      // Reduce the quantity of the product
      const updatedCart = state.cart
        .map((p) =>
          p.product === productId
            ? { ...p, quantity: Math.max(0, p.quantity - 1) }
            : p
        )
        .filter((p) => p.quantity > 0); // Filter out products with quantity 0
      return { cart: updatedCart };
    });
  },
  
  
}));

export default useCartArrayStore;
