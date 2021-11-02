import React from 'react';
import './RivewItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemoveFormat } from '@fortawesome/free-solid-svg-icons';
const RivewItem = (props) => {
   
   const { name, price, seller, quantity, key } = props.product;
   const removeItem = props.removeItem;
   // console.log(quantity)
   return (
      <div>
          <div className="item">
         {/* <div className="item-img">
            <img src={img} alt="" />
         </div> */}

         <div className="product-detail">
            <h4 className='item-header'>{name}</h4>
            <p><small> by: {seller}</small></p>

            <div className="item-description">
               <div>
                  <p>$ {price}</p>
                  <p>Quantity: {quantity}</p>
                  <button onClick={() => removeItem(key)} className="main-button"> <FontAwesomeIcon icon={faRemoveFormat} />Remove Item</button>
               </div>

               <div>

               </div>
            </div>
         </div>

      </div>
      </div>
   );
};

export default RivewItem;