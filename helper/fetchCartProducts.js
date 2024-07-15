import axios from "axios";
import useCartArrayStore from "@/app/store/cartStore";
import useCartStore from "@/app/store/store";

async function fetchCart() {
  const sessionEmail = useCartStore.getState().sessionEmail;
  const menuitem = useCartStore.getState().menuitem;
  const updateCart = useCartArrayStore.getState().updateCart;
  const updateCartProducts = useCartArrayStore.getState().updateCartProducts;

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

    updateCart(cartData);
    updateCartProducts(mergedCart);
    console.log(mergedCart);
  } catch (error) {
    console.log(error);
  }
}

export default fetchCart;
