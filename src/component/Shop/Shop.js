import React, { useState, useEffect } from "react";
import "./Shop.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Product from "./../Product/Product";
import Cart from "../Cart/Cart";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import { Link } from "react-router-dom";

const Shop = () => {
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((res) => {
        const result = res.slice(0, 10);
        setProducts(result);  
      });
  }, []);
  const [products, setProducts] = useState([]);
  console.log(products)
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saveToCart = getDatabaseCart();
    const productKey = Object.keys(saveToCart);

    fetch('http://localhost:5000/productsByKeys',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(productKey)
    })
    .then(response => response.json())
    .then(data => setCart(data))

    // if (products.length > 0) {
    //   const cartProduct = productKey.map((key) => {
    //     const product = products.find((pd) => pd.key === key);
    //     product.quantity = saveToCart[key];
    //     return product;
    //   }, []);
    //   setCart(cartProduct);
    // }
  }, [products]);

  const handleAddProduct = (product) => {
    const sameProduct = cart.find((pd) => pd.key === product.key);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== product.key);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);

    addToDatabaseCart(product.key, count);
  };

  return (
    <div className="shop-container">
      <div className="items-container">

    {products.length > 0 ? products.map((product) => (
          <Product
            productAddToCart={true}
            handleAddProduct={handleAddProduct}
            key={product.key}
            product={product}
          ></Product>
        )) : <Loader style={{display: 'flex', alignItems: 'center', justifyContent:'center', marginTop:'50px'}}
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
          />}      
      </div>

      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/rivew">
            <button className="rivew-button">
              <span>Rivew your Order</span>
            </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
