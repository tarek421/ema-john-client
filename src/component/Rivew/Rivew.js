import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import fakeData from './../../fakeData/index';
import RivewItem from './../RivewItem/RivewItem';
import thankYou from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Rivew = () => {
   const [cart, setCart] = useState([]);
   const [orderPlaced, setOrderPlaced] = useState(false);

   let history = useHistory();

   const handleOrderPlaced = () => {
     history.push("/shipment");
   }

   const removeItem = (productKey) => {
      const newCart = cart.filter(pd => pd.key !== productKey);
      setCart(newCart);
      removeFromDatabaseCart(productKey);
   }
   // console.log(cart);

   useEffect(() => {
      const saveToCart = getDatabaseCart();
      const productKey = Object.keys(saveToCart);
      const cartProduct = productKey.map(key => {
         const product = fakeData.find(pd => pd.key === key);
         product.quantity = saveToCart[key];
         return product;
      }, []);
      setCart(cartProduct)
   }, [])

   // let ThankYou;
   // if(orderPlaced){
   //    ThankYou = <img src={thankYou} alt=""/>
   // }

   return (
      <div className='shop-container'>
         <div className="items-container">
            {
               cart.map(pd => <RivewItem removeItem={removeItem} key={pd.key} product={pd} />)
            }
            {
               orderPlaced && <img src={thankYou} alt="" />
            }
         </div>
         <div className="cart-container">
            <Cart cart={cart}><button onClick={handleOrderPlaced} className='rivew-button'><span>Place Order</span></button></Cart>
            {
               orderPlaced && <h3>Thank you for order</h3>
            }
         </div>
      </div>
   );
};

export default Rivew;