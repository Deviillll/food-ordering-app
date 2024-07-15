// "use client"
// import useCartArrayStore from "../store/cartStore";
// import useCartStore from "../store/store";


// const func = () => {
//     const getCartProducts = () => {
//         const menuitem = useCartStore((state)=>state.menuitem) ;
//         const Cart = useCartArrayStore((state) => state.cart);
      
//         const cartProducts = Cart.map(cartItem => {
//           const product = menuitem.find(item => item._id === cartItem.product);
//           if (product) {
//             return {
//               product: cartItem.product,
//               name: product.name,
//               quantity: cartItem.quantity,
//               price: product.price,
//               total: cartItem.quantity * product.price
//             };
//           } else {
//             console.log(`Product with ID ${cartItem.product} not found.`);
//             return null;
//           }
//         }).filter(item => item !== null);
      
//         return cartProducts;
//       };
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default func

