import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
   // console.log(props)
   const { name, img, price, seller, stock, key } = props.product;
   // console.log(key)
   return (
      <div className="item">
         <div className="item-img">
            <img src={img} alt="" />
         </div>

         <div className="product-detail">
            <h4 className='item-header'><Link to={'product/'+key}>{name}</Link></h4>
            <p><small> by: {seller}</small></p>

            <div className="item-description">
               <div>
                  <p>$ {price}</p>
                  <p><small>Only {stock} left in stock - order soon</small></p>
                  {props.productAddToCart === true && <button onClick={() => props.handleAddProduct(props.product)} className="main-button"><FontAwesomeIcon icon={faShoppingCart} />add to cart</button>}
               </div>

               <div>

               </div>
            </div>
         </div>

      </div>
   );
};

export default Product;