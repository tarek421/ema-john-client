import React from 'react';
import './Cart.css'

const Cart = (props) => {
   const cart = props.cart;
   console.log(cart.quantity)

   const formatNumber = num => {
      let pricitional = num.toFixed(2);
      return Number(pricitional);
   }
   
   /*============================*/
   // let Price = formatNumber(cart.reduce((total, product) => total + product.price * product.quantity, 0));
   /*============================*/ 

   let Price = 0;
   for (let i = 0; i < cart.length; i++) {
      const product = cart[i];
      Price = formatNumber(Price + product.price * product.quantity);
      debugger;
   }

   let shipping = 0;
   if (Price > 35) {
      shipping = 0;
   }else if(Price > 15){
      shipping = 4.99;
   }else if(Price > 0){
      shipping = 12.99;
   }

   const tax = formatNumber(Price / 10);
   const totalBeforeTax = formatNumber(Price + shipping);

   const totalPrice = formatNumber(Price + shipping + tax);



   

   return (
      <div className='cart'>
         <h3>Order Summary</h3>
         <p>Items Ordered: {cart.length}</p>
         <table>
            <tbody>
            <tr>
               <td>Items:</td>
               <td>${Price}</td>
            </tr>
            <tr>
               <td>Shipping & Handling:</td>
               <td>$ {shipping}</td>
            </tr>
            <tr>
               <td>Total before tax:</td>
               <td>$ {totalBeforeTax}</td>
            </tr>
            <tr>
               <td>Estimated Tax:</td>
               <td>$ {tax}</td>
            </tr>
            <tr className='total-row'>
               <td>Order Total:</td>
               <td>$ {totalPrice}</td>
            </tr>
            </tbody>
         </table>
         {
            props.children
         }
      </div>
   );
};

export default Cart;