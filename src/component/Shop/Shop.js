import React, { useState, useEffect } from 'react';
import fackData from '../../fakeData'
import './Shop.css';
import Product from './../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from './../../fakeData/index';
import { Link } from 'react-router-dom';

const Shop = () => {
     const first10 = fackData.slice(0, 10);
     const [products] = useState(first10);
     const [cart, setCart] = useState([]);
     useEffect(() => {
          const saveToCart = getDatabaseCart();
          const productKey = Object.keys(saveToCart);
          console.log(productKey)
          const cartProduct = productKey.map(key => {
               const product = fakeData.find(pd => pd.key === key);
               product.quantity = saveToCart[key];
               return product;
          }, []);
          setCart(cartProduct)
     }, [])

     const handleAddProduct = (product) => {

          const sameProduct = cart.find(pd => pd.key === product.key);
          let count = 1;
          let newCart;
          if (sameProduct) {
               count = sameProduct.quantity + 1;
               sameProduct.quantity = count;
               const others = cart.filter(pd => pd.key !== product.key);
               newCart = [...others, sameProduct];
          } else {
               product.quantity = 1;
               newCart = [...cart, product];
          }
          setCart(newCart);

          addToDatabaseCart(product.key, count);
     }

     return (
          <div className="shop-container">
               <div className="items-container">
                    {
                         products.map(product => <Product productAddToCart={true} handleAddProduct={handleAddProduct} key={product.key} product={product}></Product>)
                    }
               </div>

               <div className="cart-container">
                    <Cart cart={cart}><Link to="/rivew"><button className='rivew-button'><span>Rivew your Order</span></button></Link></Cart>
               </div>

          </div>
     );
};

export default Shop;