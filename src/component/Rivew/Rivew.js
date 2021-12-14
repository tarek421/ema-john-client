import React, { useEffect, useState } from "react";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import RivewItem from "./../RivewItem/RivewItem";
import thankYou from "../../images/giphy.gif";
import { useHistory } from "react-router";

const Rivew = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced] = useState(false);
  let history = useHistory();
  console.log(cart)

  const handleOrderPlaced = () => {
    history.push("/shipment");
  };

  const removeItem = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  useEffect(() => {
    const saveToCart = getDatabaseCart();
    const productKey = Object.keys(saveToCart);
    fetch('http://fast-cove-85764.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKey)
        })
        .then(res => res.json())
        .then(data => setCart(data))
  }, [cart]);

  return (
    <div className="shop-container">
      <div className="items-container">
        {cart && cart.map((pd) => (
          <RivewItem removeItem={removeItem} key={pd.key} product={pd} />
        ))}
        {orderPlaced && <img src={thankYou} alt="" />}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handleOrderPlaced} className="rivew-button">
            <span>Place Order</span>
          </button>
        </Cart>
        {orderPlaced && <h3>Thank you for order</h3>}
      </div>
    </div>
  );
};

export default Rivew;
