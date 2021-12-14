import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
   const {productKey} = useParams();
   
   const [product, setProduct] = useState({});
   console.log(product)
   useEffect(() =>{
      fetch('http://fast-cove-85764.herokuapp.com/product/'+productKey)
      .then(response => response.json())
      .then(res => setProduct(res))
   },[productKey]);

   return (
      <div>
         <Product productAddToCart={false} product={product}></Product>
      </div>
   );
};

export default ProductDetail;